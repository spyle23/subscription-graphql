import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Box, Grid, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  GetVideoCall,
  GetVideoCallVariables,
} from "../../graphql/videoCall/types/GetVideoCall";
import {
  GET_VIDEO_CALL,
  JOIN_ROOM,
  LEAVE_CALL,
  LISTEN_LEAVE_CALL,
  LISTEN_RETURN_SIGNAL,
  LISTEN_SEND_SIGNAL,
  LISTEN_TOOGLE_DEVICES,
  RETURN_SIGNAL,
  SEND_SIGNAL,
  TOOGLE_DEVICES,
} from "../../graphql/videoCall";
import { useApplicationContext } from "../../hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import {
  SendSignal,
  SendSignalVariables,
} from "../../graphql/videoCall/types/SendSignal";
import {
  LisenSendSignal,
  LisenSendSignalVariables,
  LisenSendSignal_lisenSendSignal_user,
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
import {
  LeaveCall,
  LeaveCallVariables,
} from "../../graphql/videoCall/types/LeaveCall";
import {
  LisenLeaveCall,
  LisenLeaveCallVariables,
} from "../../graphql/videoCall/types/LisenLeaveCall";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallEndIcon from "@mui/icons-material/CallEnd";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { DynamicAvatar } from "../../components/Avatar/DynamicAvatar";
import "./index.css";
import {
  ToogleDevices,
  ToogleDevicesVariables,
} from "../../graphql/videoCall/types/ToogleDevices";
import {
  ListenToogleDevices,
  ListenToogleDevicesVariables,
} from "../../graphql/videoCall/types/ListenToogleDevices";

export type IPeer = {
  user: LisenSendSignal_lisenSendSignal_user;
  peer: SimplePeer.Instance;
};

const VideoCall = () => {
  const location = useLocation();
  const { user, dispatchSnack } = useApplicationContext();
  const [video, setVideo] = useState<boolean>(true);
  const [audio, setAudio] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const peersRef = useRef<IPeer[]>([]);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const token = useMemo(() => location.search.split("=")[1], [location.search]);
  const [nbr, setNbr] = useState<number>(0);
  const [callers, setCallers] = useState<IPeer[]>([]);
  const [sendSignal] = useMutation<SendSignal, SendSignalVariables>(
    SEND_SIGNAL
  );
  const [toogleDevices] = useMutation<ToogleDevices, ToogleDevicesVariables>(
    TOOGLE_DEVICES
  );
  const { data: listenToogleDevices } = useSubscription<
    ListenToogleDevices,
    ListenToogleDevicesVariables
  >(LISTEN_TOOGLE_DEVICES, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });
  const [exec] = useMutation<LeaveCall, LeaveCallVariables>(LEAVE_CALL);
  const { data: listenLeaveCall } = useSubscription<
    LisenLeaveCall,
    LisenLeaveCallVariables
  >(LISTEN_LEAVE_CALL, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });
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
    const peer = new SimplePeer({ initiator: false, trickle: false, stream });
    peer.on("signal", async (signal) => {
      await returnSignal({
        variables: {
          signal: JSON.stringify(signal),
          receiverId,
          userId,
        },
      });
    });
    console.log("connect send signal");
    peer.signal(JSON.parse(signal));

    return peer;
  };

  useEffect(() => {
    const handleTabClose = async () => {
      if (user) {
        await exec({ variables: { userId: user.id, token } });
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [user, token]);

  useEffect(() => {
    if (listenLeaveCall) {
      peersRef.current.filter(
        (a) => a.user.id !== listenLeaveCall.lisenLeaveCall.id
      );
      setCallers((curr) =>
        curr.filter((a) => a.user.id !== listenLeaveCall.lisenLeaveCall.id)
      );
      dispatchSnack({
        open: true,
        severity: "info",
        message: `${listenLeaveCall.lisenLeaveCall.firstname} ${listenLeaveCall.lisenLeaveCall.lastname}`,
        subtitle: "a quitté le call",
        withImage: true,
        photo: listenLeaveCall.lisenLeaveCall.photo ?? undefined,
      });
    }
  }, [listenLeaveCall]);

  useEffect(() => {
    if (
      listenReturnSignal &&
      nbr === 0 &&
      callers.find(
        (val) => val.user.id === listenReturnSignal.lisenReturnSignal.receiverId
      )
    ) {
      const index = callers.findIndex(
        (val) => val.user.id === listenReturnSignal.lisenReturnSignal.receiverId
      );
      if (index !== -1) {
        callers[index].peer.signal(
          JSON.parse(listenReturnSignal.lisenReturnSignal.signal)
        );
      }
      setNbr(1);
    }
  }, [listenReturnSignal, nbr, callers]);

  useEffect(() => {
    if (audio) {
      let mediaStream: MediaStream;
      let audioContext: AudioContext;

      const setupAudio = async () => {
        try {
          // Get user media stream
          mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });

          // Create audio context
          audioContext = new window.AudioContext();
          const source = audioContext.createMediaStreamSource(mediaStream);
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          source.connect(analyser);

          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const detectSpeaking = () => {
            analyser.getByteFrequencyData(dataArray);

            // Calculate average amplitude
            const average =
              dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;

            // Adjust this threshold based on your needs
            peersRef.current.forEach((val) => {
              val.peer.send(JSON.stringify({ isSpeaking: average > 50 }));
            });
            setIsSpeaking(average > 50);

            requestAnimationFrame(detectSpeaking);
          };

          detectSpeaking();
        } catch (error) {
          console.error("Error setting up audio:", error);
        }
      };

      setupAudio();
      return () => {
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
        }
        if (audioContext) {
          audioContext.close();
        }
      };
    }
  }, [audio]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        if (
          listenSendSignal &&
          !peersRef.current.find(
            (i) => i.user.id === listenSendSignal.lisenSendSignal.receiverId
          )
        ) {
          console.log("item");
          const peer = addPeer(
            listenSendSignal.lisenSendSignal.signal,
            stream,
            listenSendSignal.lisenSendSignal.user.id,
            listenSendSignal.lisenSendSignal.receiverId
          );
          peer.on("connect", () => {
            console.log("connecté remote");
          });
          peersRef.current.push({
            peer,
            user: listenSendSignal.lisenSendSignal.user,
          });
          setCallers((val) => [
            ...val,
            {
              peer,
              user: listenSendSignal.lisenSendSignal.user,
            },
          ]);
          return;
        }
        if (data && data.getVideoCall.members.length > 0 && user) {
          const peers: IPeer[] = [];
          data.getVideoCall.members.forEach((val) => {
            const peer = createPeer(stream, user.id, val.id);
            peer.on("connect", () => {
              console.log("connecté");
            });
            peers.push({ peer, user: val });
            peersRef.current.push({ peer, user: val });
          });
          setCallers(peers);
        }
      });
  }, [listenSendSignal, user, data]);

  useEffect(() => {
    if (video) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((str) => {
        if (userVideo.current) {
          userVideo.current.srcObject = str;
        }
      });
    }
  }, [video]);

  if (!user) return null;

  const endCall = async () => {
    await exec({ variables: { userId: user.id, token } });
    const peerToDestroy = peersRef.current.find((a) => a.user.id === user.id);
    if (peerToDestroy) {
      peerToDestroy.peer.destroy();
      peersRef.current.filter((val) => val.user.id !== user.id);
      setCallers((curr) => curr.filter((a) => a.user.id !== user.id));
    }
    window.close();
  };

  const toogleVoice = async () => {
    await toogleDevices({
      variables: { token, userId: user.id, audio: !audio, video },
    });
    peersRef.current.map((val) => {
      val.peer.streams[0].getAudioTracks().forEach((track) => {
        track.enabled = !audio;
      });
    });
    setAudio((curr) => !curr);
  };

  const toogleCam = async () => {
    await toogleDevices({
      variables: { token, userId: user.id, audio, video: !video },
    });
    peersRef.current.map((val) => {
      val.peer.streams[0].getVideoTracks().forEach((track) => {
        track.enabled = !video;
      });
    });
    setVideo((curr) => !curr);
  };

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ p: 1, display: "flex", justifyContent: "center" }}
        >
          {video ? (
            <Box
              component="video"
              ref={userVideo}
              autoPlay
              muted
              playsInline
              sx={{
                borderRadius: "15px",
                height: { xs: undefined, md: "100%" },
              }}
            />
          ) : (
            <Box
              className={`${isSpeaking && audio ? "is-speaking" : ""}`}
              sx={{
                width: { xs: "80%", md: "100%" },
                height: { xs: "200px", md: "100%" },
                backgroundColor: "lightgrey",
                display: "flex",
                justifyContent: "center",
                borderRadius: "15px",
                alignItems: "center",
              }}
            >
              <DynamicAvatar
                user={{ ...user, status: true }}
                avatarSx={{ width: 56, height: 56 }}
              />
            </Box>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            p: 1,
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            height: { md: "90vh" },
          }}
        >
          {callers.map((val) => (
            <UserMedia
              key={val.user.id}
              val={val}
              devices={
                listenToogleDevices &&
                listenToogleDevices.listenToogleDevices.userId === val.user.id
                  ? listenToogleDevices.listenToogleDevices
                  : undefined
              }
            />
          ))}
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", position: "sticky", bottom: "16px" }}>
        <Box
          sx={{
            width: { xs: "90%", md: "50%" },
            py: 1,
            backgroundColor: "lightgrey",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={toogleVoice} sx={{ mr: 1 }}>
            {audio ? (
              <KeyboardVoiceIcon sx={{ fill: "white" }} />
            ) : (
              <MicOffIcon sx={{ fill: "white" }} />
            )}
          </IconButton>
          <IconButton onClick={toogleCam} sx={{ mr: 1 }}>
            {video ? (
              <VideocamIcon sx={{ fill: "white" }} />
            ) : (
              <VideocamOffIcon sx={{ fill: "white" }} />
            )}
          </IconButton>
          <IconButton sx={{ mr: 1 }}>
            <PresentToAllIcon sx={{ fill: "white" }} />
          </IconButton>
          <IconButton onClick={endCall} sx={{ backgroundColor: "red", mr: 1 }}>
            <CallEndIcon sx={{ fill: "white" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoCall;
