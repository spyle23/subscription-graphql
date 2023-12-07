import { Box, BoxProps } from "@mui/material";
import { FC, useEffect } from "react";
import { HeaderMessage } from "./HeaderMessage";
import { MessageItem } from "./MessageItem";
import { MessageActionType } from "../../../types/message";
import {
  MessageToUser_messageToUser,
  MessageTwoUser_messageTwoUser,
} from "../../../graphql/message";
import { MessageInput } from "../../../types/graphql-types";
import { useApplicationContext } from "../../../hooks";
import { MessageForm } from "./MessageForm";
import { WriteMessage } from "../../../graphql/message/types/WriteMessage";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import { SyncLoader } from "react-spinners";

type SecondpageMessageProps = {
  currentMessage: MessageActionType;
  writting?: WriteMessage;
  messages: (MessageTwoUser_messageTwoUser | MessageToUser_messageToUser)[];
  sendMessage: (data: MessageInput) => Promise<void>;
} & BoxProps;

export const SecondpageMessage: FC<SecondpageMessageProps> = ({
  writting,
  currentMessage,
  messages,
  sendMessage,
  ...props
}) => {
  const { user } = useApplicationContext();
  return (
    <Box {...props}>
      <HeaderMessage
        data={currentMessage.userDiscuss}
        group={currentMessage.DiscussGroup}
      />
      <Box sx={{ p: 2, height: "90%", overflowY: "auto" }}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} user={user} />
        ))}
        {writting?.writeMessage.isWritting &&
          (writting?.writeMessage.userId === currentMessage.userId ||
            writting?.writeMessage.userId === currentMessage.receiverId) && (
            <Box>
              <DynamicAvatar user={currentMessage.userDiscuss ?? undefined} />
              <SyncLoader color="#f7f7f7" loading size={30} />
            </Box>
          )}
      </Box>
      <MessageForm
        sendMessage={sendMessage}
        discussion={currentMessage}
        user={user}
      />
    </Box>
  );
};