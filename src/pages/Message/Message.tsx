import { Grid } from "@mui/material";
import React, { createContext, useMemo, useEffect, useState } from "react";
import addNotification from "react-push-notification";
import { FirstpageMessage } from "./components/FirstpageMessage";
import { MessageContexteType, MessageGlobalApp } from "../../types/message";
import { useMessage } from "../../hooks/message/useMessage";
import { SecondpageMessage } from "./components/SecondpageMessage";
import { GetDiscussionCurrentUser_getDiscussionCurrentUser } from "../../graphql/discussion/types/GetDiscussionCurrentUser";
import { determineUserOrGroup } from "./components/PresenterMessage";
import { login_login_data } from "../../graphql/user";
import { MessageInput } from "../../types/graphql-types";

export const MessageContext = createContext<MessageContexteType>({
  currentDiscussion: undefined,
  setCurrentDiscussion: (val) => {},
} as MessageContexteType);

export const Message = (): JSX.Element => {
  const { data, messageData, writting, refetchMessageData, user, sendMessage } =
    useMessage();
  const [currentDiscussion, setCurrentDiscussion] =
    useState<MessageGlobalApp>();
  const memoizedMessage: MessageContexteType = useMemo(
    () => ({
      currentDiscussion,
      setCurrentDiscussion,
    }),
    [currentDiscussion, setCurrentDiscussion]
  );

  useEffect(() => {
    if (data?.messageToUser) {
      addNotification({
        title: `${data.messageToUser.User.firstname} ${data.messageToUser.User.lastname}`,
        message: `${data.messageToUser.messages[0].content}`,
        native: true,
        icon: `${data.messageToUser.User.photo}`,
      });
    }
  }, [data]);

  const handleSelect = (
    data: GetDiscussionCurrentUser_getDiscussionCurrentUser
  ) => {
    setCurrentDiscussion({
      ...data,
      newMessageNbr: 0,
      openMessage: true,
      userDiscuss: determineUserOrGroup(
        user as login_login_data,
        data.User,
        data.Receiver,
        data.DiscussGroup
      ),
    });
  };

  const handleBack = () => {
    setCurrentDiscussion(undefined);
  };

  return (
    <Grid container>
      {!currentDiscussion?.id ? (
        <Grid item xs={12} sx={{ p: 2 }}>
          <MessageContext.Provider value={memoizedMessage}>
            <FirstpageMessage
              data={data}
              onSelect={handleSelect}
              messageData={messageData}
              refetchMessageData={refetchMessageData}
            />
          </MessageContext.Provider>
        </Grid>
      ) : (
        <Grid item xs={12}>
          {currentDiscussion.openMessage && (
            <SecondpageMessage
              messageToUser={
                currentDiscussion.id === data?.messageToUser.id
                  ? data.messageToUser
                  : undefined
              }
              handleBack={handleBack}
              writting={writting}
              currentDiscussion={currentDiscussion}
              sendMessage={sendMessage}
              sx={{ height: "80vh" }}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};
