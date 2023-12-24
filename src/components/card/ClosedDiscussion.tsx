import { Avatar, Badge, Box, useTheme } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import { SyncLoader } from "react-spinners";
import { ActionMessageType, MessageGlobalApp } from "../../types/message";
import { WriteMessage } from "../../graphql/message/types/WriteMessage";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  MESSAGE_TWO_USER,
  MessageToUser,
  MessageToUser_messageToUser,
  MessageTwoUser,
  MessageTwoUserVariables,
} from "../../graphql/message";
import { useApolloClient, useQuery } from "@apollo/client";

type ClosedDiscussionProps = {
  i: MessageGlobalApp;
  messageToUser?: MessageToUser_messageToUser;
  dispatchDiscussion: React.Dispatch<ActionMessageType>;
};

export const ClosedDiscussion: FC<ClosedDiscussionProps> = React.memo(
  ({ i, messageToUser, dispatchDiscussion }) => {
    const theme = useTheme();
    const { data: messages } = useQuery<
      MessageTwoUser,
      MessageTwoUserVariables
    >(MESSAGE_TWO_USER, {
      variables: { discussionId: i.id },
      skip: !i.id,
    });
    const apolloClient = useApolloClient();
    useEffect(() => {
      if (
        messageToUser &&
        messages &&
        !messages.messageTwoUser.find(
          (i) => i.id === messageToUser.messages[0].id
        )
      ) {
        apolloClient.writeQuery<MessageTwoUser, MessageTwoUserVariables>({
          data: {
            messageTwoUser: [
              ...messages.messageTwoUser,
              ...messageToUser.messages,
            ],
          },
          query: MESSAGE_TWO_USER,
          variables: { discussionId: i.id },
        });
      }
    }, [messageToUser, messages]);
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
        {i.writters && i.writters.length > 0 && (
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
