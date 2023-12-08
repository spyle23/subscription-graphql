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
import { determineUserOrGroup } from "../../pages/Message/components/PresenterMessage";
import { login_login_data } from "../../graphql/user";
import { WriteMessage } from "../../graphql/message/types/WriteMessage";
import { useNavigate } from "react-router-dom";

type MessageToolbarProps = {
  currentMessage: MessageActionType;
  user?: login_login_data;
  dispatch: React.Dispatch<ActionType>;
  data: MessageToUser | undefined;
  writting?:WriteMessage;
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
  user,
  dispatch,
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
  const { dispatchDiscussion, discussion } = useContext(DiscussionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.messageToUser && user && window.innerWidth >= 900) {
      if (
        !discussion.find(
          (val) =>
            val.userId === data.messageToUser.userId &&
            (data.messageToUser.discussGroupId
              ? val.discussGroupId === data.messageToUser.discussGroupId
              : val.receiverId === data.messageToUser.receiverId)
        )
      ) {
        dispatch({
          type: "select message",
          value: data.messageToUser,
          userDiscuss: determineUserOrGroup(user, data.messageToUser),
        });
        setNumberMsg((prev) => prev + 1);
      } else {
        refetch();
      }
    }
  }, [data, user]);

  useEffect(() => {
    if (messageTwoUser) {
      dispatchDiscussion({
        type: "add discussion",
        value: { ...currentMessage, messages: messageTwoUser.messageTwoUser },
      });
    }
  }, [messageTwoUser, currentMessage, dispatchDiscussion]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if(window.innerWidth < 900){
      navigate("/subscription-graphql/landing/messages");
      return;
    }
    setAnchorEl(event.currentTarget);
    setNumberMsg(0);
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
            data={data}
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
