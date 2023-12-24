import { FC, useEffect, useState } from "react";
import { Box, Grid, GridProps, Typography, useTheme } from "@mui/material";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import {
  MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup,
  MessagesOfCurrentUser_messagesOfCurrentUser_User,
} from "../../../graphql/message/types/MessagesOfCurrentUser";
import { login_login_data } from "../../../graphql/user";
import { GetDiscussionCurrentUser_getDiscussionCurrentUser } from "../../../graphql/discussion/types/GetDiscussionCurrentUser";
import { MessageGlobalApp } from "../../../types/message";
import { SyncLoader } from "react-spinners";
type PresenterMessageProps = {
  user?: login_login_data;
  discussion: MessageGlobalApp;
} & GridProps;

export const determineUserOrGroup = (
  user: login_login_data,
  owner: MessagesOfCurrentUser_messagesOfCurrentUser_User,
  receiver: MessagesOfCurrentUser_messagesOfCurrentUser_User | null,
  discussGroup: MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup | null
) => {
  if (discussGroup) {
    return discussGroup;
  }
  return owner.id === user.id
    ? (receiver as MessagesOfCurrentUser_messagesOfCurrentUser_User)
    : owner;
};

export const PresenterMessage: FC<PresenterMessageProps> = ({
  discussion,
  user,
  sx,
  ...props
}) => {
  const theme = useTheme();
  if (!user) return <></>;
  const uploadMessage =
    user.id === discussion.messages[0].User.id
      ? "Vous avez envoyé une pièce jointe"
      : "a envoyé une pièce jointe";
  const displayUserMessage = determineUserOrGroup(
    user,
    discussion.User,
    discussion.Receiver,
    discussion.DiscussGroup
  );
  const message = discussion.messages[0];
  const displayMessage =
    message.content.length > 25
      ? `${message.content.substring(0, 25)}...`
      : message.content;
  const displayMessageUser =
    user.id === discussion.messages[0].User.id
      ? `vous: ${displayMessage}`
      : displayMessage;
  return (
    <Grid
      container
      sx={{
        p: 1,
        cursor: "pointer",
        alignItems: "center",
        borderRadius: "15px",
        ":hover": { backgroundColor: "lightgrey" },
        ...sx,
      }}
      {...props}
    >
      <Grid
        item
        xs={2}
        sx={{ display: "flex", justifyContent: "center", mr: 1 }}
      >
        <DynamicAvatar user={displayUserMessage} />
      </Grid>
      <Grid item xs={9}>
        <Typography fontWeight={"bold"}>
          {"groupName" in displayUserMessage
            ? displayUserMessage.groupName
            : displayUserMessage.firstname + " " + displayUserMessage.lastname}
        </Typography>
        {discussion.writters && discussion.writters.length > 0 ? (
          <Box
            sx={{
              p: 1,
              borderRadius: "20px",
              backgroundColor: "lightgray",
              width: "max-content",
            }}
          >
            <SyncLoader color={theme.palette.primary.main} loading size={5} />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontWeight: discussion.newMessageNbr > 0 ? "bold" : "normal",
              }}
            >
              {message.files.length > 0 ? uploadMessage : displayMessageUser}
            </Typography>
            {discussion.newMessageNbr > 0 && (
              <Box
                sx={{
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  backgroundColor: theme.palette.primary.main,
                }}
              />
            )}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
