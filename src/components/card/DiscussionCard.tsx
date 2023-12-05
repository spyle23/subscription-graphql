import { FC } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardProps,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  ActionMessageType,
  MessageActionType,
  MessageGlobalApp,
} from "../../types/message";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";
import { MessageItem } from "../../pages/Message/components/MessageItem";
import { login_login_data } from "../../graphql/user";
import CollectionsIcon from "@mui/icons-material/Collections";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { MessageForm } from "../../pages/Message/components/MessageForm";
import { MessageInput } from "../../types/graphql-types";
import { WriteMessage } from "../../graphql/message/types/WriteMessage";
import { SyncLoader } from "react-spinners";

type DiscussionCardProps = {
  discussion: MessageGlobalApp;
  writting?: WriteMessage;
  user?: login_login_data;
  dispatchDiscussion: React.Dispatch<ActionMessageType>;
  sendMessage: (data: MessageInput, value?: MessageActionType) => Promise<void>;
} & CardProps;

export const DiscussionCard: FC<DiscussionCardProps> = ({
  discussion,
  user,
  writting,
  dispatchDiscussion,
  sendMessage,
  ...cardProps
}) => {
  const theme = useTheme();
  return (
    <Card {...cardProps}>
      <CardHeader
        avatar={
          discussion.userDiscuss ? (
            <DynamicAvatar sx={{ mr: 0 }} user={discussion.userDiscuss} />
          ) : (
            <Avatar src={discussion.DiscussGroup?.coverPhoto || ""} />
          )
        }
        title={
          discussion.userDiscuss
            ? `${discussion.userDiscuss.firstname} ${discussion.userDiscuss.lastname}`
            : discussion.DiscussGroup?.groupName
        }
        action={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() =>
                dispatchDiscussion({
                  type: "minimize discussion",
                  value: discussion,
                  trigger: false,
                })
              }
            >
              <MinimizeIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                dispatchDiscussion({
                  type: "delete discussion",
                  value: discussion,
                })
              }
            >
              <CloseIcon />
            </IconButton>
          </Box>
        }
      />
      <CardContent sx={{ height: "350px", overflowY: "auto" }}>
        {discussion.messages.map((message) => (
          <MessageItem key={message.id} message={message} user={user} />
        ))}
        {writting?.writeMessage.isWritting &&
          (writting?.writeMessage.userId === discussion.userId ||
            writting?.writeMessage.userId === discussion.receiverId) && (
            <Box sx={{ display: "flex", alignItems: "center" }} >
              <DynamicAvatar user={discussion.userDiscuss ?? undefined} sx={{ mr: 1 }} />
              <SyncLoader color={theme.palette.primary.main} loading size={5} />
            </Box>
          )}
      </CardContent>
      <CardActions>
        <MessageForm
          sendMessage={sendMessage}
          discussion={discussion}
          user={user}
        />
      </CardActions>
    </Card>
  );
};
