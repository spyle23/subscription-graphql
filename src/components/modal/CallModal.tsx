import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Callers } from "../../contexts";
import React, { FC, useEffect, useRef, useState } from "react";
type CallModalProps = {
  callers: Callers[];
} & DialogProps;

export const CallModal: FC<CallModalProps> = ({ callers, ...props }) => {
  useEffect(() => {
    for (let caller of callers) {
      if (caller.ref.current) {
        caller.ref.current.srcObject = caller.stream;
      }
    }
  }, [callers]);
  // console.log("refs", refs.current);
  return (
    <Dialog {...props}>
      <DialogTitle sx={{ width: 300, textAlign: "center" }}>
        Meeting:
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 300,
          height: 300,
        }}
      >
        <Grid container>
          {callers.map((val, i) => (
            <Grid item xs={4} key={i} sx={{ p: 1, borderRadius: "10px" }}>
              <video
                ref={val.ref}
                autoPlay
                playsInline
                muted
                style={{ width: "100%" }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      {/* <DialogActions sx={{ justifyContent: "center" }}>
        <IconButton
          onClick={() => handleCall(true, discussion.id, userId)}
          sx={{ mr: 1, backgroundColor: "green" }}
        >
          <CallIcon sx={{ fill: "white" }} />
        </IconButton>
        <IconButton
          onClick={() => handleCall(false, discussion.id, userId)}
          sx={{ backgroundColor: "red" }}
        >
          <CallEndIcon sx={{ fill: "white" }} />
        </IconButton>
      </DialogActions> */}
    </Dialog>
  );
};
