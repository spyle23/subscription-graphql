import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  GetVideoCall,
  GetVideoCallVariables,
  GetVideoCall_getVideoCall,
} from "../../graphql/videoCall/types/GetVideoCall";
import {
  GET_VIDEO_CALL,
  LISTEN_RETURN_SIGNAL,
  LISTEN_SEND_SIGNAL,
  RETURN_SIGNAL,
  SEND_SIGNAL,
} from "../../graphql/videoCall";
import { useApplicationContext } from "../../hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import {
  SendSignal,
  SendSignalVariables,
} from "../../graphql/videoCall/types/SendSignal";
import {
  LisenSendSignal,
  LisenSendSignalVariables,
} from "../../graphql/videoCall/types/LisenSendSignal";
import {
  ReturnSignal,
  ReturnSignalVariables,
} from "../../graphql/videoCall/types/ReturnSignal";
import {
  LisenReturnSignal,
  LisenReturnSignalVariables,
} from "../../graphql/videoCall/types/LisenReturnSignal";
import { UserMedia } from "./components/UserMedia";

type IPeer = {
  userId: number;
  peer: SimplePeer.Instance;
};

const VideoCall = () => {
  const location = useLocation();
  const { user } = useApplicationContext();
  const peersRef = useRef<IPeer[]>([]);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const token = useMemo(() => location.search.split("=")[1], [location.search]);
  const [callers, setCallers] = useState<IPeer[]>([]);
  const [sendSignal] = useMutation<SendSignal, SendSignalVariables>(
    SEND_SIGNAL
  );
  const [returnSignal] = useMutation<ReturnSignal, ReturnSignalVariables>(
    RETURN_SIGNAL
  );
  const { data: listenSendSignal } = useSubscription<
    LisenSendSignal,
    LisenSendSignalVariables
  >(LISTEN_SEND_SIGNAL, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });
  const { data: listenReturnSignal } = useSubscription<
    LisenReturnSignal,
    LisenReturnSignalVariables
  >(LISTEN_RETURN_SIGNAL, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });
  const { data } = useQuery<GetVideoCall, GetVideoCallVariables>(
    GET_VIDEO_CALL,
    {
      variables: {
        token: token,
        userId: user?.id as number,
      },
      skip: !user?.id || !token,
    }
  );

  const createPeer = (
    stream: MediaStream,
    userId: number,
    receiverId: number
  ): SimplePeer.Instance => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", async (signal) => {
      await sendSignal({
        variables: {
          signal: JSON.stringify(signal),
          receiverId,
          userId,
        },
      });
    });

    return peer;
  };

  const addPeer = (
    signal: string,
    stream: MediaStream,
    userId: number,
    receiverId: number
  ) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on("signal", async (signal) => {
      await returnSignal({
        variables: {
          signal: JSON.stringify(signal),
          receiverId,
          userId,
        },
      });
    });
    peer.signal(JSON.parse(signal));

    return peer;
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        if (listenSendSignal) {
          const peer = addPeer(
            listenSendSignal.lisenSendSignal.signal,
            stream,
            listenSendSignal.lisenSendSignal.userId,
            listenSendSignal.lisenSendSignal.receiverId
          );
          peersRef.current.push({
            peer,
            userId: listenSendSignal.lisenSendSignal.userId,
          });
          setCallers((val) => [
            ...val,
            {
              peer,
              userId: listenSendSignal.lisenSendSignal.userId,
            },
          ]);
          return;
        }
        if (data && user) {
          console.log("data", data.getVideoCall.members);
          const peers: IPeer[] = [];
          data.getVideoCall.members.forEach((val) => {
            const peer = createPeer(stream, user.id, val.id);
            peersRef.current.push({ peer, userId: val.id });
            peers.push({ peer, userId: val.id });
          });
          setCallers(peers);
        }
      });
  }, [listenSendSignal, user, data]);

  useEffect(() => {
    if (listenReturnSignal) {
      const item = peersRef.current.find(
        (a) => a.userId === listenReturnSignal.lisenReturnSignal.userId
      );
      if (item) {
        item.peer.signal(
          JSON.parse(listenReturnSignal.lisenReturnSignal.signal)
        );
      }
    }
  }, [listenReturnSignal]);

  useEffect(() => {
    if (userVideo.current) {
      console.log("userVideo",typeof userVideo.current.onloadedmetadata);
      userVideo.current.onloadedmetadata = (e) => {
        console.log("Video metadata:", e);
        // Play the video once metadata is loaded
        userVideo.current?.play();
      };
    };
  }, [userVideo.current]);

  return (
    <Box>
      <video
        ref={userVideo}
        autoPlay
        muted
        playsInline
        style={{ width: "200px" }}
      ></video>
      {callers.map((val, index) => (
        <UserMedia key={index} peer={val.peer} />
      ))}
    </Box>
  );
};

export default VideoCall;
