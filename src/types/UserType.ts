import SimplePeer from "simple-peer";

export enum UserAuthStateEnum {
  WAITING = "waiting",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}

export type VideoCall = {
  stream: MediaStream;
  peer: SimplePeer.Instance;
};
