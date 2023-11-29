import {
  Grid
} from "@mui/material";
import React, {
  createContext,
  useMemo,
  useEffect,
} from "react";
import { MessageInput } from "../../types/graphql-types";
import { useSendMessage } from "../../hooks/message/useSendMessage";
import addNotification from "react-push-notification";
import { FirstpageMessage } from "./components/FirstpageMessage";
import { MessageContexteType } from "../../types/message";
import { useMessage } from "../../hooks/message/useMessage";
import { SecondpageMessage } from "./components/SecondpageMessage";

export const MessageContext = createContext<MessageContexteType>(
  {} as MessageContexteType
);

export const Message = (): JSX.Element => {
  const { sendMessage: sendMessageExec } = useSendMessage();
  const {
    user,
    currentMessage,
    dispatch,
    data,
    messageData,
    messageTwoUser,
    refetch,
    refetchMessageData,
  } = useMessage();
  const memoizedMessage: MessageContexteType = useMemo(
    () => ({
      currentMessage,
      dispatch,
    }),
    [currentMessage, dispatch]
  );

  const messages = useMemo(() => {
    if (!messageTwoUser?.messageTwoUser) return [];
    const currentMessages = data?.messageToUser
      ? [...messageTwoUser?.messageTwoUser, data.messageToUser]
      : messageTwoUser?.messageTwoUser;
    return currentMessages;
  }, [messageTwoUser, data]);
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

  useEffect(() => {
    if (data?.messageToUser) {
      addNotification({
        title: `${data.messageToUser.User.firstname} ${data.messageToUser.User.lastname}`,
        message: `${data.messageToUser.content}`,
        native: true,
        icon: `${data.messageToUser.User.photo}`,
      });
    }
  }, [data]);

  return (
    <Grid container>
      <Grid item md={4} sx={{ p: 2 }}>
        <MessageContext.Provider value={memoizedMessage}>
          <FirstpageMessage
            messageData={messageData}
            refetch={refetch}
            refetchMessageData={refetchMessageData}
          />
        </MessageContext.Provider>
      </Grid>
      <Grid item md={8} sx={{ borderLeft: "1px solid gray" }}>
        {currentMessage.openMessage && (
          <SecondpageMessage currentMessage={currentMessage} messages={messages} sendMessage={sendMessage} sx={{ height: "90vh" }} />
        )}
      </Grid>
    </Grid>
  );
};
