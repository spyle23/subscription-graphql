import { FC } from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import { MessagesOfCurrentUser_messagesOfCurrentUser } from "../../../graphql/message/types/MessagesOfCurrentUser";
import { login_login_data } from "../../../graphql/user";
type PresenterMessageProps = {
  user?: login_login_data;
  message: MessagesOfCurrentUser_messagesOfCurrentUser;
};

const determineUserOrGroup = (
  user: login_login_data,
  message: MessagesOfCurrentUser_messagesOfCurrentUser
) => {
  if (message.Receiver?.id === user.id) {
    return message.User;
  }
  return message.Receiver;
};

export const PresenterMessage: FC<PresenterMessageProps> = ({
  message,
  user,
}) => {
  if (!user) return <></>;
  const displayUserMessage = determineUserOrGroup(user, message);
  return (
    <Grid container sx={{ p: 1 }}>
      <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
        {displayUserMessage ? (
          <DynamicAvatar user={displayUserMessage} />
        ) : (
          <Avatar
            alt={message.DiscussGroup?.groupName || "profile"}
            src={message.DiscussGroup?.coverPhoto as string}
          />
        )}
      </Grid>
      <Grid item xs={10}>
        <Typography fontWeight={"bold"}>
          {displayUserMessage
            ? displayUserMessage.firstname + " " + displayUserMessage.lastname
            : message.DiscussGroup?.groupName}
        </Typography>
        <Typography>{message.content}</Typography>
      </Grid>
    </Grid>
  );
};
