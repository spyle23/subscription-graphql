import { Avatar, Badge, Box, useTheme } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import { SyncLoader } from "react-spinners";
import { ActionMessageType, MessageGlobalApp } from "../../types/message";
import { WriteMessage } from "../../graphql/message/types/WriteMessage";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { MessageToUser } from "../../graphql/message";

type ClosedDiscussionProps = {
  i: MessageGlobalApp;
  writting?: WriteMessage;
  dispatchDiscussion: React.Dispatch<ActionMessageType>;
};

export const ClosedDiscussion: FC<ClosedDiscussionProps> = React.memo(
  ({ i, writting, dispatchDiscussion }) => {
    const theme = useTheme();
    return (
      <Box
        onClick={() => {
          dispatchDiscussion({ type: "trigger", trigger: true, value: i });
        }}
        sx={{
          width: "max-content",
          mb: 2,
          position: "relative",
          cursor: "pointer",
          ":hover": {
            ".MuiSvgIcon-root": {
              display: "block",
            },
          },
        }}
      >
        <Badge badgeContent={i.newMessageNbr} color="error">
          <DynamicAvatar user={i.userDiscuss} sx={{ mr: 0 }} />
        </Badge>
        <CancelOutlinedIcon
          onClick={() =>
            dispatchDiscussion({ type: "delete discussion", value: i })
          }
          sx={{
            fontSize: "small",
            fill: theme.palette.primary.main,
            cursor: "pointer",
            position: "absolute",
            top: 0,
            display: "none",
            right: 0,
          }}
        />
        {writting?.writeMessage.isWritting &&
          (writting?.writeMessage.userId === i.User.id ||
            writting?.writeMessage.userId === i.Receiver?.id) && (
            <SyncLoader
              color={theme.palette.primary.main}
              loading
              size={3}
              style={{ position: "absolute", bottom: 0, left: 0 }}
            />
          )}
      </Box>
    );
  }
);
