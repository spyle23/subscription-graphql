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
  } = useMessage();
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

  const discussions = useMemo<MessageGlobalApp[]>(() => {
    if (!messageData?.getDiscussionCurrentUser) return [];
    if (data) {
      return messageData.getDiscussionCurrentUser.find(
        (i) => i.id === data.messageToUser.id
      )
        ? messageData.getDiscussionCurrentUser.map<MessageGlobalApp>((val) =>
            val.id === data.messageToUser.id
              ? {
                  ...val,
                  newMessageNbr: 1,
                  messages: data.messageToUser.messages,
                  userDiscuss: determineUserOrGroup(
                    user as login_login_data,
                    val.User,
                    val.Receiver,
                    val.DiscussGroup
                  ),
                  openMessage: false,
                  writters:
                    writting &&
                    writting.writeMessage.discussionId === val.id &&
                    writting.writeMessage.isWritting
                      ? [writting.writeMessage.user]
                      : undefined,
                }
              : {
                  ...val,
                  newMessageNbr: 0,
                  userDiscuss: determineUserOrGroup(
                    user as login_login_data,
                    val.User,
                    val.Receiver,
                    val.DiscussGroup
                  ),
                  openMessage: false,
                  writters:
                    writting &&
                    writting.writeMessage.discussionId === val.id &&
                    writting.writeMessage.isWritting
                      ? [writting.writeMessage.user]
                      : undefined,
                }
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
            ...messageData.getDiscussionCurrentUser.map<MessageGlobalApp>(
              (val) => ({
                ...val,
                newMessageNbr: 0,
                userDiscuss: determineUserOrGroup(
                  user as login_login_data,
                  val.User,
                  val.Receiver,
                  val.DiscussGroup
                ),
                openMessage: false,
                writters:
                  writting &&
                  writting.writeMessage.discussionId === val.id &&
                  writting.writeMessage.isWritting
                    ? [writting.writeMessage.user]
                    : undefined,
              })
            ),
          ];
    }
    if (writting && writting.writeMessage.isWritting) {
      return messageData.getDiscussionCurrentUser.map<MessageGlobalApp>((val) =>
        val.id === writting.writeMessage.discussionId
          ? {
              ...val,
              newMessageNbr: 0,
              userDiscuss: determineUserOrGroup(
                user as login_login_data,
                val.User,
                val.Receiver,
                val.DiscussGroup
              ),
              openMessage: false,
              writters: [writting.writeMessage.user],
            }
          : {
              ...val,
              newMessageNbr: 0,
              userDiscuss: determineUserOrGroup(
                user as login_login_data,
                val.User,
                val.Receiver,
                val.DiscussGroup
              ),
              openMessage: false,
            }
      );
    }
    return messageData.getDiscussionCurrentUser.map<MessageGlobalApp>(
      (val) => ({
        ...val,
        newMessageNbr: 0,
        userDiscuss: determineUserOrGroup(
          user as login_login_data,
          val.User,
          val.Receiver,
          val.DiscussGroup
        ),
        openMessage: false,
      })
    );
  }, [data, messageData, writting]);

  const handleBack = () => {
    setCurrentDiscussion(undefined);
  };

  return (
    <Grid container>
      {!currentDiscussion?.id ? (
        <Grid item xs={12} sx={{ p: 2 }}>
          <MessageContext.Provider value={memoizedMessage}>
            <FirstpageMessage
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
