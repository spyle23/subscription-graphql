import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  GetVideoCall,
  GetVideoCallVariables,
} from "../../graphql/videoCall/types/GetVideoCall";
import {
  GET_VIDEO_CALL,
  LEAVE_CALL,
  LISTEN_LEAVE_CALL,
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
import videoGroup from "../../assets/group-video.png";
import "./index.css";
import { VideoCardSkeleton } from "../../components/skeleton/VideoCardSkeleton";

export type IPeer = {
  user: LisenSendSignal_lisenSendSignal_user;
  peer: SimplePeer.Instance;
  audio: boolean;
  video: boolean;
};

const VideoCall = () => {
  const location = useLocation();
  const { user, dispatchSnack } = useApplicationContext();
  const [video, setVideo] = useState<boolean>(true);
  const [audio, setAudio] = useState<boolean>(true);
  const [cameraInvalid, setCameraInvalid] = useState<boolean>(false);
  const audioRef = useRef<HTMLDivElement | null>(null);
  const peersRef = useRef<IPeer[]>([]);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const token = useMemo(() => location.search.split("=")[1], [location.search]);
  const [nbrListen, setNbrListen] = useState<number>(0);
  const [callers, setCallers] = useState<IPeer[]>([]);
  const [sendSignal, { loading: sendSignalLoading }] = useMutation<
    SendSignal,
    SendSignalVariables
  >(SEND_SIGNAL);
  const [exec, { loading: leaveCallLoading }] = useMutation<
    LeaveCall,
    LeaveCallVariables
  >(LEAVE_CALL);
  const { data: listenLeaveCall } = useSubscription<
    LisenLeaveCall,
    LisenLeaveCallVariables
  >(LISTEN_LEAVE_CALL, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });
  const [returnSignal, { loading: returnSignalLoading }] = useMutation<
    ReturnSignal,
    ReturnSignalVariables
  >(RETURN_SIGNAL);
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
  const { data, error } = useQuery<GetVideoCall, GetVideoCallVariables>(
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
    audio: boolean,
    video: boolean,
    receiverId: number
  ): SimplePeer.Instance => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:stun3.l.google.com:19302" },
          { urls: "stun:stun4.l.google.com:19302" },
          {
            urls: "turn:freeturn.net:3478",
            credential: "free",
            username: "free",
          },
          {
            urls: "turn:relay1.expressturn.com:3478",
            credential: "1TJPNFxHKXrZfelz",
            username: "efPU52K4SLOQ34W2QY",
          },
        ],
      },
    });
    peer.on("signal", async (signal) => {
      await sendSignal({
        variables: {
          signal: JSON.stringify(signal),
          audio,
          video,
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
    audio: boolean,
    video: boolean,
    receiverId: number
  ) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:stun3.l.google.com:19302" },
          { urls: "stun:stun4.l.google.com:19302" },
          {
            urls: "turn:freeturn.net:3478",
            credential: "free",
            username: "free",
          },
          {
            urls: "turn:relay1.expressturn.com:3478",
            credential: "1TJPNFxHKXrZfelz",
            username: "efPU52K4SLOQ34W2QY",
          },
        ],
      },
    });
    peer.on("signal", async (signal) => {
      await returnSignal({
        variables: {
          signal: JSON.stringify(signal),
          audio,
          video,
          receiverId,
          userId,
        },
      });
    });
    console.log("connect send signal");
    peer.signal(JSON.parse(signal));

    return peer;
  };

  const callbackFonction = useCallback(
    (stream: MediaStream, audioDefault: boolean, videoDefault: boolean) => {
      if (data) {
        if (
          listenSendSignal &&
          !peersRef.current.find(
            (i) => i.user.id === listenSendSignal.lisenSendSignal.user.id
          )
        ) {
          const peer = addPeer(
            listenSendSignal.lisenSendSignal.signal,
            stream,
            listenSendSignal.lisenSendSignal.user.id,
            audioDefault,
            videoDefault,
            listenSendSignal.lisenSendSignal.receiverId
          );
          peer.on("connect", () => {
            console.log("connecté remote");
          });
          peersRef.current.push({
            peer,
            user: listenSendSignal.lisenSendSignal.user,
            audio: listenSendSignal.lisenSendSignal.audio,
            video: listenSendSignal.lisenSendSignal.video,
          });
          setCallers((val) => [
            ...val,
            {
              peer,
              user: listenSendSignal.lisenSendSignal.user,
              audio: listenSendSignal.lisenSendSignal.audio,
              video: listenSendSignal.lisenSendSignal.video,
            },
          ]);
          dispatchSnack({
            open: true,
            severity: "info",
            message: `${listenSendSignal.lisenSendSignal.user.firstname} ${listenSendSignal.lisenSendSignal.user.lastname}`,
            subtitle: "a rejoin le call",
            withImage: true,
            photo: listenSendSignal.lisenSendSignal.user.photo ?? undefined,
          });
        } else if (
          data.getVideoCall.members.length > 0 &&
          user &&
          nbrListen === 0
        ) {
          const peers: IPeer[] = [];
          data.getVideoCall.members.forEach((val) => {
            const peer = createPeer(
              stream,
              user.id,
              audioDefault,
              videoDefault,
              val.id
            );
            peer.on("connect", () => {
              console.log("connecté");
            });
            peers.push({ peer, user: val, audio: true, video: true });
            peersRef.current.push({
              peer,
              user: val,
              audio: true,
              video: true,
            });
          });
          setCallers(peers);
          setNbrListen(1);
        }
      }
    },
    [listenSendSignal, user, data, nbrListen]
  );

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
      peersRef.current = [...peersRef.current].filter(
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
      peersRef.current.find(
        (val) => val.user.id === listenReturnSignal.lisenReturnSignal.receiverId
      )
    ) {
      console.log("listenReturn Signal");
      const index = callers.findIndex(
        (val) => val.user.id === listenReturnSignal.lisenReturnSignal.receiverId
      );
      if (index !== -1) {
        callers[index].peer.signal(
          JSON.parse(listenReturnSignal.lisenReturnSignal.signal)
        );
      }
      setCallers((curr) =>
        curr.map((i) =>
          i.user.id === listenReturnSignal.lisenReturnSignal.receiverId
            ? {
                ...i,
                audio: listenReturnSignal.lisenReturnSignal.audio,
                video: listenReturnSignal.lisenReturnSignal.video,
              }
            : i
        )
      );
    }
  }, [listenReturnSignal]);

  useEffect(() => {
    if (audio && !video) {
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
            // setIsSpeaking(average > 50);
            if (audioRef.current) {
              if (average > 50) {
                audioRef.current.classList.add("is-speaking");
              } else {
                audioRef.current.classList.remove("is-speaking");
              }
            }

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
  }, [audio, video]);

  useEffect(() => {
    if (data) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
          callbackFonction(stream, true, true);
        })
        .catch((err) => {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              callbackFonction(stream, true, false);
              setCameraInvalid(true);
              setVideo(false);
            });
        });
    }
  }, [data, callbackFonction]);

  // useEffect(() => {
  //   if (video) {
  //     navigator.mediaDevices.getUserMedia({ video: true }).then((str) => {
  //       if (userVideo.current) {
  //         userVideo.current.srcObject = str;
  //       }
  //     });
  //   }
  // }, [video]);

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

  const toogleVoice = () => {
    peersRef.current.map((val) => {
      val.peer.send(JSON.stringify({ audio: !audio }));
      val.peer.streams[0].getAudioTracks().forEach((track) => {
        track.enabled = !audio;
      });
    });
    setAudio((curr) => !curr);
  };

  const toogleCam = () => {
    if (!cameraInvalid) {
      peersRef.current.map((val) => {
        val.peer.send(JSON.stringify({ video: !video }));
        val.peer.streams[0].getVideoTracks().forEach((track) => {
          track.enabled = !video;
        });
      });
      setVideo((curr) => !curr);
    }
  };

  const handleScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((str) => {
        peersRef.current.forEach((val) => {
          val.peer.addStream(str);
        });
      });
  };

  if (!data && error) {
    return (
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          {error.message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box component="img" src={videoGroup} sx={{ width: "60%" }} />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ p: 1, display: "flex", justifyContent: "center" }}
        >
          <Box
            component="video"
            ref={userVideo}
            autoPlay
            muted
            playsInline
            sx={{
              borderRadius: "15px",
              height: { xs: "auto", md: "100%" },
              width: { xs: "100%", md: "auto" },
              display: video ? "block" : "none",
            }}
          />
          {!video && (
            <Box
              ref={audioRef}
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
              <DynamicAvatar user={user} avatarSx={{ width: 56, height: 56 }} />
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
            flexFlow: "row wrap",
            justifyContent: "center",
            height: { md: "90vh" },
          }}
        >
          {callers.map((val) => (
            <UserMedia key={val.user.id} val={val} />
          ))}
          {sendSignalLoading || returnSignalLoading ? (
            <VideoCardSkeleton />
          ) : null}
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "sticky",
          bottom: "16px",
        }}
      >
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
          <Tooltip
            title={`${audio ? "désactiver le micro" : "activer le micro"}`}
          >
            <IconButton onClick={toogleVoice} sx={{ mr: 1 }}>
              {audio ? (
                <KeyboardVoiceIcon sx={{ fill: "white" }} />
              ) : (
                <MicOffIcon sx={{ fill: "white" }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip
            title={`${video ? "désactiver la camera" : "activer la caméra"}`}
          >
            <IconButton
              disabled={cameraInvalid}
              onClick={toogleCam}
              sx={{ mr: 1 }}
            >
              {video ? (
                <VideocamIcon sx={{ fill: "white" }} />
              ) : (
                <VideocamOffIcon sx={{ fill: "white" }} />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="partager son écran">
            <IconButton onClick={handleScreen} sx={{ mr: 1 }}>
              <PresentToAllIcon sx={{ fill: "white" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Racrocher">
            <IconButton
              disabled={leaveCallLoading}
              onClick={endCall}
              sx={{ backgroundColor: "red", mr: 1 }}
            >
              <CallEndIcon sx={{ fill: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoCall;
