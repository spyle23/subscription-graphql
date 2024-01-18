import { FC, useEffect, useRef } from "react";
import SimplePeer from "simple-peer";

type UserMediaProps = {
  peer: SimplePeer.Instance;
};

export const UserMedia: FC<UserMediaProps> = ({ peer }) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    peer.on("stream", (stream) => {
      const track = stream.getVideoTracks()[0];

      // Log track state
      console.log("Track state:", track.readyState);
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [ref.current]);

  useEffect(() => {
    if (ref.current) {
      console.log(
        "ref current ato anaty userMedia",
        typeof ref.current.onloadedmetadata
      );
      ref.current.onloadedmetadata = (e) => {
        console.log("Video metadata:", e);
        // Play the video once metadata is loaded
        ref.current?.play();
      }
    }
  }, [ref.current]);
  return (
    <video autoPlay playsInline ref={ref} style={{ width: "200px" }}></video>
  );
};
