import { useQuery } from "@apollo/client";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { createContext, useMemo, useReducer, useState } from "react";
import {
  MessageTwoUser,
  MessageTwoUserVariables,
  MESSAGE_TWO_USER,
} from "../../graphql/message";
import {
  MessagesOfCurrentUser_messagesOfCurrentUser,
  MessagesOfCurrentUser_messagesOfCurrentUser_Receiver,
  MessagesOfCurrentUser_messagesOfCurrentUser_User,
} from "../../graphql/message/types/MessagesOfCurrentUser";
import { useApplicationContext } from "../../hooks";
import { ContainerMessage } from "./components/ContainerMessage";
import { HeaderMessage } from "./components/HeaderMessage";
import { MessageItem } from "./components/MessageItem";

type MessageActionType = {
  openMessage: boolean;
  userDiscuss?:
    | MessagesOfCurrentUser_messagesOfCurrentUser_User
    | MessagesOfCurrentUser_messagesOfCurrentUser_Receiver
    | null;
  receiverId?: number;
  userId?: number;
  discussGroupId?: number;
};

type MessageContexteType = {
  currentMessage: MessageActionType;
  dispatch: React.Dispatch<ActionType>;
};

type ActionType = {
  type: string;
  value: MessagesOfCurrentUser_messagesOfCurrentUser;
  userDiscuss:
    | MessagesOfCurrentUser_messagesOfCurrentUser_User
    | MessagesOfCurrentUser_messagesOfCurrentUser_Receiver
    | null;
};

const initialValue: MessageActionType = {
  openMessage: false,
  receiverId: undefined,
  userId: undefined,
};

const reducerMessage = (state: MessageActionType, action: ActionType) => {
  switch (action.type) {
    case "select message":
      return {
        openMessage: true,
        receiverId: action.value.Receiver?.id,
        userId: action.value.User?.id,
        discussGroupId: action.value.DiscussGroup?.id,
        userDiscuss: action.userDiscuss,
      };
    default:
      return initialValue;
  }
};

export const MessageContext = createContext<MessageContexteType>(
  {} as MessageContexteType
);

export const Message = (): JSX.Element => {
  const { user } = useApplicationContext();
  const [currentMessage, dispatch] = useReducer(reducerMessage, initialValue);
  const memoizedMessage = useMemo(
    () => ({
      currentMessage,
      dispatch,
    }),
    [currentMessage, dispatch]
  );
  const { data } = useQuery<MessageTwoUser, MessageTwoUserVariables>(
    MESSAGE_TWO_USER,
    {
      variables: {
        userId: memoizedMessage.currentMessage.userId as number,
        receiverId: memoizedMessage.currentMessage.receiverId,
        discussGroupId: memoizedMessage.currentMessage.discussGroupId,
      },
      skip: !memoizedMessage.currentMessage.userId,
    }
  );

  return (
    <Grid container>
      <Grid item md={4} sx={{ p: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            📧 Messages
          </Typography>
        </Box>
        <MessageContext.Provider value={memoizedMessage}>
          <ContainerMessage />
        </MessageContext.Provider>
      </Grid>
      <Grid item md={8} sx={{ borderLeft: "1px solid gray" }}>
        {currentMessage.openMessage && (
          <Box>
            {currentMessage.userDiscuss && (
              <HeaderMessage data={currentMessage.userDiscuss} />
            )}
            <Box sx={{ p: 2 }}>
              {data?.messageTwoUser.map((message) => (
                <MessageItem key={message.id} message={message} user={user} />
              ))}
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
