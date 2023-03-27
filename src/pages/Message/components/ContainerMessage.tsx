import { useQuery } from "@apollo/client";
import { Box, BoxProps } from "@mui/material";
import { FC } from "react";
import { MESSAGES_CURRENT_USER } from "../../../graphql/message";
import {
  MessagesOfCurrentUser,
  MessagesOfCurrentUserVariables,
} from "../../../graphql/message/types/MessagesOfCurrentUser";
import { useApplicationContext } from "../../../hooks";
import { PresenterMessage } from "./PresenterMessage";

export const ContainerMessage: FC<BoxProps> = ({ sx, ...props }) => {
  const { user } = useApplicationContext();
  const { data: messageData } = useQuery<
    MessagesOfCurrentUser,
    MessagesOfCurrentUserVariables
  >(MESSAGES_CURRENT_USER, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });
  return (
    <Box sx={{ height: "80vh", overflowY: "auto", ...sx }} {...props}>
      {messageData?.messagesOfCurrentUser?.map((value, index) => (
        <PresenterMessage key={index} message={value} user={user} />
      ))}
    </Box>
  );
};
