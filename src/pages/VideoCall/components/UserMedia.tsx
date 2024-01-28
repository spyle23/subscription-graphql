import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { IPeer } from "..";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import MicOffIcon from "@mui/icons-material/MicOff";
import { ListenToogleDevices_listenToogleDevices } from "../../../graphql/videoCall/types/ListenToogleDevices";
import "../index.css";

type UserMediaProps = {
  val: IPeer;
};

export const UserMedia: FC<UserMediaProps> = memo(({ val }) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const { peer, user } = val;
  const audioRef = useRef<HTMLDivElement | null>(null);
  peer.on("stream", (stream) => {
    if (ref.current) {
      console.log("str", stream);
      ref.current.srcObject = stream;
    }
  });
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
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          position: "relative",
          height: "max-content",
          width: "max-content",
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
            display: video ? "block" : "none",
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
