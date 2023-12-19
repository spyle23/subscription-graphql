import { Box, BoxProps, useTheme } from "@mui/material";
import { FC, useEffect, useMemo } from "react";
import { HeaderMessage } from "./HeaderMessage";
import { MessageItem } from "./MessageItem";
import { MessageInput } from "../../../types/graphql-types";
import { useApplicationContext } from "../../../hooks";
import { MessageForm } from "./MessageForm";
import { WriteMessage } from "../../../graphql/message/types/WriteMessage";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import { SyncLoader } from "react-spinners";
import { MessageGlobalApp } from "../../../types/message";
import { useApolloClient, useQuery } from "@apollo/client";
import {
  MESSAGE_TWO_USER,
  MessageToUser_messageToUser,
  MessageTwoUser,
  MessageTwoUserVariables,
  SendMessageDiscoussGroup_sendMessageDiscoussGroup,
} from "../../../graphql/message";

type SecondpageMessageProps = {
  currentDiscussion: MessageGlobalApp;
  writting?: WriteMessage;
  messageToUser?: MessageToUser_messageToUser;
  sendMessage: (
    data: MessageInput,
    userId: number,
    discussionId: number,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => Promise<SendMessageDiscoussGroup_sendMessageDiscoussGroup | undefined>;
  handleBack: () => void;
} & BoxProps;

export const SecondpageMessage: FC<SecondpageMessageProps> = ({
  writting,
  currentDiscussion,
  messageToUser,
  handleBack,
  sendMessage,
  ...props
}) => {
  const { user } = useApplicationContext();
  const theme = useTheme();
  const apolloClient = useApolloClient();
  const { data: messages } = useQuery<MessageTwoUser, MessageTwoUserVariables>(
    MESSAGE_TWO_USER,
    {
      variables: { discussionId: currentDiscussion.id },
      skip: !currentDiscussion.id,
    }
  );
  useEffect(() => {
    if (messageToUser && messages) {
      apolloClient.writeQuery<MessageTwoUser, MessageTwoUserVariables>({
        data: {
          messageTwoUser: [
            ...messages.messageTwoUser,
            ...messageToUser.messages,
          ],
        },
        query: MESSAGE_TWO_USER,
        variables: { discussionId: currentDiscussion.id },
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
        variables: { discussionId: currentDiscussion.id },
      });
    }
    return mess;
  };
  return (
    <Box {...props}>
      <HeaderMessage
        handleBack={handleBack}
        data={currentDiscussion.userDiscuss}
      />
      <Box sx={{ p: 2, height: "90%", overflowY: "auto" }}>
        {messages?.messageTwoUser.map((message) => (
          <MessageItem key={message.id} message={message} user={user} />
        ))}
        {writting?.writeMessage.isWritting &&
          (writting?.writeMessage.userId === currentDiscussion.User.id ||
            writting?.writeMessage.userId ===
              currentDiscussion.Receiver?.id) && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DynamicAvatar user={currentDiscussion.userDiscuss} />
              <SyncLoader color={theme.palette.primary.main} loading size={5} />
            </Box>
          )}
      </Box>
      <MessageForm
        sendMessage={sendMessage}
        discussion={currentDiscussion}
        user={user}
      />
    </Box>
  );
};
