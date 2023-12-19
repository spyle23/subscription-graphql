import { Box, BoxProps } from "@mui/material";
import React, { FC, useMemo } from "react";
import {
  MessageToUser,
  MessageToUser_messageToUser,
} from "../../../graphql/message";
import { MessagesOfCurrentUser_messagesOfCurrentUser } from "../../../graphql/message/types/MessagesOfCurrentUser";
import { useApplicationContext } from "../../../hooks";
import { determineUserOrGroup, PresenterMessage } from "./PresenterMessage";
import {
  GetDiscussionCurrentUser,
  GetDiscussionCurrentUser_getDiscussionCurrentUser,
} from "../../../graphql/discussion/types/GetDiscussionCurrentUser";

type ContainerMessageProps = {
  data?: MessageToUser;
  selectDiscussion: (
    data: GetDiscussionCurrentUser_getDiscussionCurrentUser
  ) => void;
  messageData?: GetDiscussionCurrentUser;
  onClose?: () => void;
} & BoxProps;

export const ContainerMessage: FC<ContainerMessageProps> = React.memo(
  ({ messageData, data, selectDiscussion, onClose, sx, ...props }) => {
    const { user } = useApplicationContext();

    const messageCurrent = useMemo(() => {
      if (data?.messageToUser) {
        return messageData?.getDiscussionCurrentUser.find(
          (e) => e.id === data.messageToUser.id
        )
          ? messageData?.getDiscussionCurrentUser.map((i) =>
              i.id === data.messageToUser.id ? data.messageToUser : i
            )
          : messageData?.getDiscussionCurrentUser;
      }
      return messageData?.getDiscussionCurrentUser;
    }, [messageData, data]);

    const handleClickMessage = (
      value: GetDiscussionCurrentUser_getDiscussionCurrentUser
    ) => {
      selectDiscussion(value);
      onClose && onClose();
    };

    return (
      <Box sx={{ height: "450px ", overflowY: "auto", p: 2, ...sx }} {...props}>
        {messageCurrent?.map((value, index) => (
          <PresenterMessage
            key={index}
            discussion={value}
            isNewMessage={
              data?.messageToUser && value.id === data?.messageToUser.id
                ? true
                : false
            }
            user={user}
            onClick={() => handleClickMessage(value)}
          />
        ))}
      </Box>
    );
  }
);
