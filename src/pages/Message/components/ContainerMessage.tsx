import { useQuery } from "@apollo/client";
import { Box, BoxProps } from "@mui/material";
import React, { FC, useContext } from "react";
import { MESSAGES_CURRENT_USER } from "../../../graphql/message";
import {
  MessagesOfCurrentUser,
  MessagesOfCurrentUserVariables,
  MessagesOfCurrentUser_messagesOfCurrentUser,
} from "../../../graphql/message/types/MessagesOfCurrentUser";
import { login_login_data } from "../../../graphql/user";
import { useApplicationContext } from "../../../hooks";
import { MessageContext } from "../Message";
import { determineUserOrGroup, PresenterMessage } from "./PresenterMessage";

export const ContainerMessage: FC<BoxProps> = React.memo(({ sx, ...props }) => {
  const { user } = useApplicationContext();
  const { dispatch } = useContext(MessageContext);
  const { data: messageData } = useQuery<
    MessagesOfCurrentUser,
    MessagesOfCurrentUserVariables
  >(MESSAGES_CURRENT_USER, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });

  const handleClickMessage = (
    value: MessagesOfCurrentUser_messagesOfCurrentUser
  ) => {
    dispatch({
      type: "select message",
      value: value,
      userDiscuss: determineUserOrGroup(user as login_login_data, value),
    });
  };

  return (
    <Box sx={{ height: "80vh", overflowY: "auto", p: 2, ...sx }} {...props}>
      {messageData?.messagesOfCurrentUser?.map((value, index) => (
        <PresenterMessage
          key={index}
          message={value}
          user={user}
          onClick={() => handleClickMessage(value)}
        />
      ))}
    </Box>
  );
});
