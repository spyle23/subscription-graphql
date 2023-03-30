import { useQuery, useSubscription } from "@apollo/client";
import { Box, BoxProps } from "@mui/material";
import React, { FC, useContext, useMemo } from "react";
import {
  LISTEN_MESSAGE,
  MESSAGES_CURRENT_USER,
  MessageToUser,
  MessageToUserVariables,
  MessageToUser_messageToUser,
  SEND_MESSAGE,
} from "../../../graphql/message";
import {
  MessagesOfCurrentUser,
  MessagesOfCurrentUserVariables,
  MessagesOfCurrentUser_messagesOfCurrentUser,
} from "../../../graphql/message/types/MessagesOfCurrentUser";
import { login_login_data } from "../../../graphql/user";
import { useApplicationContext } from "../../../hooks";
import { MessageContext } from "../Message";
import { determineUserOrGroup, PresenterMessage } from "./PresenterMessage";

type ContainerMessageProps = {
  messageData?: MessagesOfCurrentUser;
} & BoxProps;

export const ContainerMessage: FC<ContainerMessageProps> = React.memo(
  ({ messageData, sx, ...props }) => {
    const { user } = useApplicationContext();
    const { dispatch } = useContext(MessageContext);
    // const { data: messageData, refetch } = useQuery<
    //   MessagesOfCurrentUser,
    //   MessagesOfCurrentUserVariables
    // >(MESSAGES_CURRENT_USER, {
    //   variables: { userId: user?.id as number },
    //   skip: !user?.id,
    // });

    const { data } = useSubscription<MessageToUser, MessageToUserVariables>(
      LISTEN_MESSAGE,
      { variables: { userId: user?.id as number } }
    );

    const messageCurrent = useMemo(() => {
      const current = data?.messageToUser
        ? messageData?.messagesOfCurrentUser.map((item) => {
            if (
              (item.Receiver?.id == user?.id || item.User.id == user?.id) &&
              (item.Receiver?.id === data?.messageToUser.userId ||
                item.User?.id === data?.messageToUser.userId)
            ) {
              return data?.messageToUser;
            }
            return item;
          })
        : messageData?.messagesOfCurrentUser;
      return current;
    }, [messageData, data]);

    const handleClickMessage = (
      value:
        | MessagesOfCurrentUser_messagesOfCurrentUser
        | MessageToUser_messageToUser
    ) => {
      dispatch({
        type: "select message",
        value: value,
        userDiscuss: determineUserOrGroup(user as login_login_data, value),
      });
    };

    return (
      <Box sx={{ height: "80vh", overflowY: "auto", p: 2, ...sx }} {...props}>
        {messageCurrent?.map((value, index) => (
          <PresenterMessage
            key={index}
            message={value}
            user={user}
            onClick={() => handleClickMessage(value)}
          />
        ))}
      </Box>
    );
  }
);
