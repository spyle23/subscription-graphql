import { Box, BoxProps } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useApplicationContext } from "../../../hooks";
import { PresenterMessage } from "./PresenterMessage";
import { GetDiscussionCurrentUser_getDiscussionCurrentUser } from "../../../graphql/discussion/types/GetDiscussionCurrentUser";
import { MessageGlobalApp } from "../../../types/message";

type ContainerMessageProps = {
  discussions: MessageGlobalApp[];
  selectDiscussion: (
    data: GetDiscussionCurrentUser_getDiscussionCurrentUser
  ) => void;
  onClose?: () => void;
} & BoxProps;

export const ContainerMessage: FC<ContainerMessageProps> = React.memo(
  ({ discussions, selectDiscussion, onClose, sx, ...props }) => {
    const { user } = useApplicationContext();

    const handleClickMessage = (
      value: GetDiscussionCurrentUser_getDiscussionCurrentUser
    ) => {
      selectDiscussion(value);
      onClose && onClose();
    };

    return (
      <Box sx={{ height: "450px ", overflowY: "auto", p: 2, ...sx }} {...props}>
        {discussions.map((value, index) => (
          <PresenterMessage
            key={index}
            discussion={value}
            user={user}
            onClick={() => handleClickMessage(value)}
          />
        ))}
      </Box>
    );
  }
);
