import { Box, BoxProps } from "@mui/material";
import { FC } from "react";
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

type SecondpageMessageProps = {
  currentMessage: MessageActionType;
  messages: (MessageTwoUser_messageTwoUser | MessageToUser_messageToUser)[];
  sendMessage: (data: MessageInput) => Promise<void>;
} & BoxProps;

export const SecondpageMessage: FC<SecondpageMessageProps> = ({
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
      </Box>
      <MessageForm sendMessage={sendMessage} discussion={currentMessage} />
    </Box>
  );
};
