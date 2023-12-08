import { Grid } from "@mui/material";
import React, { createContext, useMemo, useEffect } from "react";
import { MessageInput } from "../../types/graphql-types";
import addNotification from "react-push-notification";
import { FirstpageMessage } from "./components/FirstpageMessage";
import { MessageActionType, MessageContexteType } from "../../types/message";
import { initialValue, useMessage } from "../../hooks/message/useMessage";
import { SecondpageMessage } from "./components/SecondpageMessage";

export const MessageContext = createContext<MessageContexteType>({
  currentMessage: initialValue,
  dispatch: (val) => {},
} as MessageContexteType);

export const Message = (): JSX.Element => {
  const {
    currentMessage,
    dispatch,
    data,
    messageData,
    messageTwoUser,
    refetch,
    sendMessage,
    writting,
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

  const handleBack = () => {
    dispatch({ type: "reset", userDiscuss: null });
  };

  return (
    <Grid container>
      {!currentMessage.receiverId && !currentMessage.discussGroupId ? (
        <Grid item xs={12} sx={{ p: 2 }}>
          <MessageContext.Provider value={memoizedMessage}>
            <FirstpageMessage
              data={data}
              messageData={messageData}
              refetch={refetch}
              refetchMessageData={refetchMessageData}
            />
          </MessageContext.Provider>
        </Grid>
      ) : (
        <Grid item xs={12}>
          {currentMessage.openMessage && (
            <SecondpageMessage
              handleBack={handleBack}
              writting={writting}
              currentMessage={currentMessage}
              messages={messages}
              sendMessage={sendMessage}
              sx={{ height: "80vh" }}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};
