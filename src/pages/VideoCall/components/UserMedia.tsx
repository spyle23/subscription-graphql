import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { IPeer } from "..";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import MicOffIcon from "@mui/icons-material/MicOff";
import { ListenToogleDevices_listenToogleDevices } from "../../../graphql/videoCall/types/ListenToogleDevices";
import "../index.css";

type UserMediaProps = {
  val: IPeer;
  devices?: ListenToogleDevices_listenToogleDevices;
};

export const UserMedia: FC<UserMediaProps> = memo(({ val, devices }) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const mediaDevice = useMemo(
    () =>
      devices
        ? { audio: devices.audio, video: devices.video }
        : { audio: true, video: true },
    [devices]
  );
  const { peer, user } = val;
  const audioRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    peer.on("stream", (stream) => {
      console.log("str", stream);
      if (ref.current && "srcObject" in ref.current) {
        ref.current.srcObject = stream;
      }
    });
    peer.on("data", (data) => {
      const dataString = new TextDecoder("utf-8").decode(data);
      if (audioRef.current) {
        JSON.parse(dataString).isSpeaking
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
            display: mediaDevice.video ? "block" : "none",
          }}
        />
        {!mediaDevice.audio && (
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
      {!mediaDevice.video && (
        <Box
          ref={audioRef}
          // className={`${isSpeaking ? "is-speaking" : ""}`}
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
          {!mediaDevice.audio && (
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
