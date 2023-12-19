import { FC, useEffect, useRef } from "react";
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
import { ActionMessageType, MessageGlobalApp } from "../../types/message";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";
import { MessageItem } from "../../pages/Message/components/MessageItem";
import { login_login_data } from "../../graphql/user";
import { MessageForm } from "../../pages/Message/components/MessageForm";
import { MessageInput } from "../../types/graphql-types";
import { WriteMessage } from "../../graphql/message/types/WriteMessage";
import { SyncLoader } from "react-spinners";
import { useApolloClient, useQuery } from "@apollo/client";
import {
  MESSAGE_TWO_USER,
  MessageToUser_messageToUser,
  MessageTwoUser,
  MessageTwoUserVariables,
  SendMessageDiscoussGroup_sendMessageDiscoussGroup,
} from "../../graphql/message";

type DiscussionCardProps = {
  discussion: MessageGlobalApp;
  writting?: WriteMessage;
  user?: login_login_data;
  messageToUser?: MessageToUser_messageToUser;
  dispatchDiscussion: React.Dispatch<ActionMessageType>;
  sendMessage: (
    data: MessageInput,
    userId: number,
    discussionId: number,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => Promise<SendMessageDiscoussGroup_sendMessageDiscoussGroup | undefined>;
} & CardProps;

export const DiscussionCard: FC<DiscussionCardProps> = ({
  discussion,
  user,
  writting,
  messageToUser,
  dispatchDiscussion,
  sendMessage,
  ...cardProps
}) => {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { data: messages } = useQuery<MessageTwoUser, MessageTwoUserVariables>(
    MESSAGE_TWO_USER,
    {
      variables: { discussionId: discussion.id },
      skip: !discussion.id,
    }
  );
  useEffect(() => {
    if (scrollRef.current && messages?.messageTwoUser) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
    }
  }, [messages]);
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
        variables: { discussionId: discussion.id },
      });
    }
  }, [messageToUser, messages]);

  const redefineSendMessage = async (
    data: MessageInput,
    userId: number,
    discussionId: number,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => {
    const mess = await sendMessage(
      data,
      userId,
      discussionId,
      receiverId,
      discussGroupId
    );
    if (messages?.messageTwoUser && mess) {
      apolloClient.writeQuery<MessageTwoUser, MessageTwoUserVariables>({
        data: {
          messageTwoUser: [...messages.messageTwoUser, ...mess.messages],
        },
        query: MESSAGE_TWO_USER,
        variables: { discussionId: discussion.id },
      });
    }
    return mess;
  };
  return (
    <Card {...cardProps}>
      <CardHeader
        avatar={<DynamicAvatar sx={{ mr: 0 }} user={discussion.userDiscuss} />}
        title={
          "groupName" in discussion.userDiscuss
            ? discussion.DiscussGroup?.groupName
            : `${discussion.userDiscuss.firstname} ${discussion.userDiscuss.lastname}`
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
      <CardContent ref={scrollRef} sx={{ height: "350px", overflowY: "auto" }}>
        {messages?.messageTwoUser.map((message) => (
          <MessageItem key={message.id} message={message} user={user} />
        ))}
        {writting?.writeMessage.isWritting &&
          (writting?.writeMessage.userId === discussion.User.id ||
            writting?.writeMessage.userId === discussion.Receiver?.id) && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DynamicAvatar
                user={discussion.userDiscuss ?? undefined}
                sx={{ mr: 1 }}
              />
              <SyncLoader color={theme.palette.primary.main} loading size={5} />
            </Box>
          )}
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <MessageForm
          sendMessage={redefineSendMessage}
          discussion={discussion}
          user={user}
        />
      </CardActions>
    </Card>
  );
};
