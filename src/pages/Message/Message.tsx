import { Grid } from "@mui/material";
import React, { createContext, useMemo, useEffect, useState } from "react";
import { FirstpageMessage } from "./components/FirstpageMessage";
import { MessageContexteType, MessageGlobalApp } from "../../types/message";
import { useMessage } from "../../hooks/message/useMessage";
import { SecondpageMessage } from "./components/SecondpageMessage";
import { GetDiscussionCurrentUser_getDiscussionCurrentUser } from "../../graphql/discussion/types/GetDiscussionCurrentUser";
import { determineUserOrGroup } from "./components/PresenterMessage";
import { login_login_data } from "../../graphql/user";

export const MessageContext = createContext<MessageContexteType>({
  currentDiscussion: undefined,
  setCurrentDiscussion: (val) => {},
} as MessageContexteType);

export const Message = (): JSX.Element => {
  const {
    data,
    messageData,
    writting,
    refetchMessageData,
    user,
    sendMessage,
    listenTheme,
    loading,
    fetchMore,
  } = useMessage();
  const [currentDiscussion, setCurrentDiscussion] =
    useState<MessageGlobalApp>();
  const [discussions, setDiscussions] = useState<MessageGlobalApp[]>([]);
  const memoizedMessage: MessageContexteType = useMemo(
    () => ({
      currentDiscussion,
      setCurrentDiscussion,
    }),
    [currentDiscussion, setCurrentDiscussion]
  );

  useEffect(() => {
    if (writting?.writeMessage) {
      setCurrentDiscussion((curr) => {
        if (curr?.id === writting.writeMessage.discussionId) {
          if (writting.writeMessage.isWritting) {
            return {
              ...curr,
              writters: curr.writters
                ? [...curr.writters, writting.writeMessage.user]
                : [writting.writeMessage.user],
            };
          }
          return {
            ...curr,
            writters: curr.writters?.filter(
              (a) => a.id !== writting.writeMessage.user.id
            ),
          };
        }
        return curr;
      });
    }
  }, [writting]);

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

  useEffect(() => {
    if (messageData?.getDiscussionCurrentUser) {
      if (data) {
        setDiscussions((curr) =>
          curr.find((i) => i.id === data.messageToUser.id)
            ? curr.map((i) =>
                i.id === data.messageToUser.id
                  ? {
                      ...i,
                      newMessageNbr: i.newMessageNbr + 1,
                      messages: data.messageToUser.messages,
                    }
                  : i
              )
            : [
                {
                  ...data.messageToUser,
                  newMessageNbr: 1,
                  userDiscuss: determineUserOrGroup(
                    user as login_login_data,
                    data.messageToUser.User,
                    data.messageToUser.Receiver,
                    data.messageToUser.DiscussGroup
                  ),
                  openMessage: false,
                },
                ...curr,
              ]
        );
      }
      if (writting) {
        setDiscussions((curr) =>
          curr.find((i) => i.id === writting.writeMessage.discussionId)
            ? curr.map((i) =>
                i.id === writting.writeMessage.discussionId
                  ? {
                      ...i,
                      writters: writting.writeMessage.isWritting
                        ? [writting.writeMessage.user]
                        : undefined,
                    }
                  : i
              )
            : curr
        );
      }
      if (!data && !writting) {
        setDiscussions(
          messageData.getDiscussionCurrentUser.map<MessageGlobalApp>((val) => ({
            ...val,
            newMessageNbr: 0,
            userDiscuss: determineUserOrGroup(
              user as login_login_data,
              val.User,
              val.Receiver,
              val.DiscussGroup
            ),
            openMessage: false,
          }))
        );
      }
    }
  }, [messageData, data, writting]);

  const handleBack = () => {
    setCurrentDiscussion(undefined);
  };

  return (
    <Grid container>
      {!currentDiscussion?.id ? (
        <Grid item xs={12} sx={{ p: 2 }}>
          <MessageContext.Provider value={memoizedMessage}>
            <FirstpageMessage
              loading={loading}
              fetchMore={fetchMore}
              discussions={discussions}
              onSelect={handleSelect}
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
              listenTheme={
                listenTheme?.listenTheme.id === currentDiscussion.id
                  ? listenTheme.listenTheme
                  : undefined
              }
              handleBack={handleBack}
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
