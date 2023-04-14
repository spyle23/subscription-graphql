import { useMutation } from "@apollo/client";
import {
  SEND_MESSAGE,
  SendMessageDiscussGroup,
  SendMessageDiscussGroupVariables,
} from "../../graphql/message";
import { MessageInput } from "../../types/graphql-types";

export const useSendMessage = () => {
  const [messageExec, { error }] = useMutation<
    SendMessageDiscussGroup,
    SendMessageDiscussGroupVariables
  >(SEND_MESSAGE);

  const sendMessage = async (
    userId: number,
    data: MessageInput,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => {
    await messageExec({
      variables: {
        userId,
        receiverId,
        discussGroupId,
        messageInput: data,
      },
    });
  };
  return {
    sendMessage,
    error: error?.message
  }
};
