import { FC } from "react";
import { Grid, GridProps, Typography } from "@mui/material";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import {
  MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup,
  MessagesOfCurrentUser_messagesOfCurrentUser_User,
} from "../../../graphql/message/types/MessagesOfCurrentUser";
import { login_login_data } from "../../../graphql/user";
import { GetDiscussionCurrentUser_getDiscussionCurrentUser } from "../../../graphql/discussion/types/GetDiscussionCurrentUser";
type PresenterMessageProps = {
  user?: login_login_data;
  isNewMessage: boolean;
  discussion: GetDiscussionCurrentUser_getDiscussionCurrentUser;
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
  isNewMessage,
  sx,
  ...props
}) => {
  if (!user) return <></>;
  const uploadMessage =
    user.id === discussion.User.id
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
  return (
    <Grid
      container
      sx={{ p: 1, cursor: "pointer", ":hover": { background: "grey" }, ...sx }}
      {...props}
    >
      <Grid
        item
        xs={1}
        sx={{ display: "flex", justifyContent: "center", mr: 2 }}
      >
        <DynamicAvatar user={displayUserMessage} />
      </Grid>
      <Grid item xs={10}>
        <Typography fontWeight={"bold"}>
          {"groupName" in displayUserMessage
            ? displayUserMessage.groupName
            : displayUserMessage.firstname + " " + displayUserMessage.lastname}
        </Typography>
        <Typography sx={{ fontWeight: isNewMessage ? "bold" : "normal" }}>
          {message.files.length > 0 ? uploadMessage : displayMessage}
        </Typography>
      </Grid>
    </Grid>
  );
};
