import { FC } from "react";
import { Avatar, Box, Grid, GridProps, Typography } from "@mui/material";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import { MessagesOfCurrentUser_messagesOfCurrentUser } from "../../../graphql/message/types/MessagesOfCurrentUser";
import { login_login_data } from "../../../graphql/user";
import { MessageToUser_messageToUser } from "../../../graphql/message";
type PresenterMessageProps = {
  user?: login_login_data;
  isNewMessage: boolean;
  message:
    | MessagesOfCurrentUser_messagesOfCurrentUser
    | MessageToUser_messageToUser;
} & GridProps;

export const determineUserOrGroup = (
  user: login_login_data,
  message:
    | MessagesOfCurrentUser_messagesOfCurrentUser
    | MessageToUser_messageToUser
) => {
  if (message.Receiver?.id === user.id) {
    return message.User;
  }
  return message.Receiver;
};

export const PresenterMessage: FC<PresenterMessageProps> = ({
  message,
  user,
  isNewMessage,
  sx,
  ...props
}) => {
  if (!user) return <></>;
  const uploadMessage =
    user.id === message.User.id
      ? "Vous avez envoyé une pièce jointe"
      : "a envoyé une pièce jointe";
  const displayUserMessage = determineUserOrGroup(user, message);
  return (
    <Grid
      container
      sx={{ p: 1, cursor: "pointer", ":hover": { background: "grey" }, ...sx }}
      {...props}
    >
      <Grid item xs={1} sx={{ display: "flex", justifyContent: "center" }}>
        {displayUserMessage ? (
          <DynamicAvatar user={displayUserMessage} />
        ) : (
          <Avatar
            sx={{ mr:2 }}
            alt={message.DiscussGroup?.groupName || "profile"}
            src={message.DiscussGroup?.coverPhoto || ""}
          />
        )}
      </Grid>
      <Grid item xs={10}>
        <Typography fontWeight={"bold"}>
          {displayUserMessage
            ? displayUserMessage.firstname + " " + displayUserMessage.lastname
            : message.DiscussGroup?.groupName}
        </Typography>
        <Typography sx={{ fontWeight: isNewMessage ? "bold" : "normal" }}>
          {message.image ? uploadMessage : message.content}
        </Typography>
      </Grid>
    </Grid>
  );
};
