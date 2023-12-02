import MailIcon from "@mui/icons-material/Mail";
import { Badge, IconButton, Popover, Typography, Box } from "@mui/material";
import React, { useEffect, useMemo, useState, useContext, FC } from "react";
import { FirstpageMessage } from "../../pages/Message/components/FirstpageMessage";
import { ActionType, MessageActionType } from "../../types/message";
import { DiscussionContext } from "../../contexts/message";
import {
  MessageToUser,
  MessageTwoUser,
  MessageTwoUserVariables,
} from "../../graphql/message";
import { ApolloQueryResult } from "@apollo/client";
import {
  MessagesOfCurrentUser,
  MessagesOfCurrentUserVariables,
} from "../../graphql/message/types/MessagesOfCurrentUser";

type MessageToolbarProps = {
  currentMessage: MessageActionType;
  dispatch: React.Dispatch<ActionType>;
  data: MessageToUser | undefined;
  messageData: MessagesOfCurrentUser | undefined;
  messageTwoUser: MessageTwoUser | undefined;
  refetch: (
    variables?: Partial<MessageTwoUserVariables> | undefined
  ) => Promise<ApolloQueryResult<MessageTwoUser>>;
  refetchMessageData: (
    variables?: Partial<MessagesOfCurrentUserVariables> | undefined
  ) => Promise<ApolloQueryResult<MessagesOfCurrentUser>>;
};

export const MessageToolbar: FC<MessageToolbarProps> = ({
  refetch,
  currentMessage,
  messageTwoUser,
  refetchMessageData,
  messageData,
  data,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [numberMsg, setNumberMsg] = useState<number>(0);
  const { dispatchDiscussion } = useContext(DiscussionContext);
  // const navigate = useNavigate();

  useEffect(() => {
    if (data?.messageToUser) {
      setNumberMsg((prev) => prev + 1);
    }
  }, [data]);

  useEffect(() => {
    if (messageTwoUser) {
      dispatchDiscussion({
        type: "add discussion",
        value: { ...currentMessage, messages: messageTwoUser.messageTwoUser },
      });
    }
  }, [messageTwoUser, currentMessage, dispatchDiscussion]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    setNumberMsg(0);
    // navigate("/subscription-graphql/landing/messages");
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={numberMsg} color="error">
          <MailIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ style: { minWidth: 300 } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 1 }}>
          <FirstpageMessage
            messageData={messageData}
            refetch={refetch}
            refetchMessageData={refetchMessageData}
            onClose={handleClose}
          />
        </Box>
      </Popover>
    </div>
  );
};
