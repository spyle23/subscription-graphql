import { FC, useEffect, useRef } from "react";
import SimplePeer from "simple-peer";

type UserMediaProps = {
  peer: SimplePeer.Instance;
};

export const UserMedia: FC<UserMediaProps> = ({ peer }) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    peer.on("stream", (stream) => {
      if (ref.current && "srcObject" in ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, []);
  return (
    <video autoPlay playsInline ref={ref} style={{ width: "200px" }}></video>
  );
};
