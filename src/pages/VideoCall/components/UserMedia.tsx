import { FC, memo, useEffect, useRef, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { IPeer } from "..";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import MicOffIcon from "@mui/icons-material/MicOff";
import "../index.css";

type UserMediaProps = {
  val: IPeer;
};

export const UserMedia: FC<UserMediaProps> = memo(({ val }) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const { peer, user, audio: defaultAudio, video: defaultVideo } = val;
  const [stream, setStream] = useState<MediaStream>();
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = audio;
      });
      stream.getVideoTracks().forEach((track) => {
        track.enabled = video;
      });
    }
  }, [audio, video, stream]);
  useEffect(() => {
    setAudio(defaultAudio);
    setVideo(defaultVideo);
  }, [defaultAudio, defaultVideo]);
  const audioRef = useRef<HTMLDivElement | null>(null);
  if (!stream) {
    peer.on("stream", (str) => {
      if (ref.current) {
        ref.current.srcObject = str;
        setStream(str);
      }
    });
  }
  useEffect(() => {
    peer.on("data", (data) => {
      const dataString = new TextDecoder("utf-8").decode(data);
      const valueObject = JSON.parse(dataString);
      if ("audio" in valueObject) {
        setAudio(valueObject.audio);
      } else if ("video" in valueObject) {
        setVideo(valueObject.video);
      } else if (audioRef.current && "isSpeaking" in valueObject) {
        valueObject.isSpeaking
          ? audioRef.current.classList.add("is-speaking")
          : audioRef.current.classList.remove("is-speaking");
      }
    });
  }, []);

  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 1 }}
    >
      <Box
        sx={{
          position: "relative",
          height: "max-content",
          width: "max-content",
          display: video ? "block" : "none",
        }}
      >
        <Box
          component="video"
          autoPlay
          playsInline
          ref={ref}
          sx={{
            borderRadius: "15px",
            height: { xs: undefined, md: "300px" },
          }}
        />
        {!audio && (
          <MicOffIcon
            sx={{
              fill: "white",
              position: "absolute",
              bottom: "10px",
              left: "10px",
            }}
          />
        )}
      </Box>
      {!video && (
        <Box
          ref={audioRef}
          sx={{
            backgroundColor: "lightgrey",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            alignItems: "center",
            borderRadius: "15px",
            width: "80%",
            height: "200px",
          }}
        >
          <DynamicAvatar user={user} avatarSx={{ width: 56, height: 56 }} />
          {!audio && (
            <Tooltip
              title={`${user.firstname} ${user.lastname} a coupé son micro`}
            >
              <MicOffIcon
                sx={{
                  fill: "white",
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                }}
              />
            </Tooltip>
          )}
        </Box>
      )}
    </Box>
  );
});
