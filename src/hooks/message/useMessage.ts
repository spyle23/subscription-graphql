import { useQuery, useSubscription } from "@apollo/client";
import { useReducer, Reducer } from "react";
import {
  MessagesOfCurrentUser,
  MessagesOfCurrentUserVariables,
} from "../../graphql/message/types/MessagesOfCurrentUser";
import { useApplicationContext } from "../application";
import {
  LISTEN_MESSAGE,
  MESSAGES_CURRENT_USER,
  MESSAGE_TWO_USER,
  MessageToUser,
  MessageToUserVariables,
  MessageTwoUser,
  MessageTwoUserVariables,
  WRITING_MESSAGE,
} from "../../graphql/message";
import { ActionType, MessageActionType } from "../../types/message";
import { MessageInput } from "../../types/graphql-types";
import { useSendMessage } from "./useSendMessage";
import {
  WriteMessage,
  WriteMessageVariables,
} from "../../graphql/message/types/WriteMessage";

export const initialValue: MessageActionType = {
  openMessage: false,
  newMessageNbr: 0,
  receiverId: undefined,
  userId: undefined,
};

const reducerMessage = (
  state: MessageActionType,
  action: ActionType
): MessageActionType => {
  switch (action.type) {
    case "select message":
      return {
        openMessage: true,
        newMessageNbr: 0,
        receiverId: action.value?.Receiver?.id,
        userId: action.value?.User?.id,
        discussGroupId: action.value?.DiscussGroup?.id,
        DiscussGroup: action.value?.DiscussGroup,
        userDiscuss: action.userDiscuss,
      };
    case "from message":
      return action.message ?? state;
    default:
      return initialValue;
  }
};

export const useMessage = () => {
  const { user } = useApplicationContext();
  const { sendMessage: sendMessageExec } = useSendMessage();
  const { data: messageData, refetch: refetchMessageData } = useQuery<
    MessagesOfCurrentUser,
    MessagesOfCurrentUserVariables
  >(MESSAGES_CURRENT_USER, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });
  const [currentMessage, dispatch] = useReducer<
    Reducer<MessageActionType, ActionType>
  >(reducerMessage, initialValue);
  const { data } = useSubscription<MessageToUser, MessageToUserVariables>(
    LISTEN_MESSAGE,
    {
      variables: { userId: user?.id as number },
      skip: !user?.id,
    }
  );
  const { data: writting } = useSubscription<
    WriteMessage,
    WriteMessageVariables
  >(WRITING_MESSAGE, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });

  const { data: messageTwoUser, refetch } = useQuery<
    MessageTwoUser,
    MessageTwoUserVariables
  >(MESSAGE_TWO_USER, {
    variables: {
      userId: currentMessage.userId as number,
      receiverId: currentMessage.receiverId,
      discussGroupId: currentMessage.discussGroupId,
    },
    skip: !currentMessage.userId,
  });

  const sendMessage = async (data: MessageInput) => {
    await sendMessageExec(
      user?.id as number,
      data,
      user?.id === currentMessage.receiverId
        ? currentMessage.userId
        : currentMessage.receiverId,
      currentMessage.discussGroupId
    );
    await refetchMessageData();
    await refetch();
  };
  return {
    user,
    messageData,
    refetchMessageData,
    currentMessage,
    dispatch,
    writting,
    sendMessage,
    data,
    messageTwoUser,
    refetch,
  };
};
