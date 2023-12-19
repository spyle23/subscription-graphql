import { useMutation } from "@apollo/client";
import {
  SEND_MESSAGE,
  SendMessageDiscoussGroup,
  SendMessageDiscoussGroupVariables,
} from "../../graphql/message";
import { MessageInput } from "../../types/graphql-types";

export const useSendMessage = () => {
  const [messageExec, { error }] = useMutation<
    SendMessageDiscoussGroup,
    SendMessageDiscoussGroupVariables
  >(SEND_MESSAGE);

  const sendMessage = async (
    userId: number,
    data: MessageInput,
    discussionId: number,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => {
    await messageExec({
      variables: {
        userId,
        discussionId,
        receiverId,
        discussGroupId,
        messageInput: data,
      },
    });
  };
  return {
    sendMessage,
    error: error?.message,
  };
};
