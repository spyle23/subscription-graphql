import MailIcon from "@mui/icons-material/Mail";
import { Badge, IconButton, Popover, Typography, Box } from "@mui/material";
import React, { useEffect, useMemo, useState, useContext, FC } from "react";
import { FirstpageMessage } from "../../pages/Message/components/FirstpageMessage";
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
import {
  GetDiscussionCurrentUser,
  GetDiscussionCurrentUserVariables,
  GetDiscussionCurrentUser_getDiscussionCurrentUser,
} from "../../graphql/discussion/types/GetDiscussionCurrentUser";

type MessageToolbarProps = {
  user?: login_login_data;
  data: MessageToUser | undefined;
  writting?: WriteMessage;
  messageData: GetDiscussionCurrentUser | undefined;
  refetchMessageData: (
    variables?: Partial<GetDiscussionCurrentUserVariables> | undefined
  ) => Promise<ApolloQueryResult<GetDiscussionCurrentUser>>;
};

export const MessageToolbar: FC<MessageToolbarProps> = ({
  user,
  refetchMessageData,
  messageData,
  data,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [numberMsg, setNumberMsg] = useState<number>(0);
  const { discussion, dispatchDiscussion } = useContext(DiscussionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      data?.messageToUser &&
      !discussion.find((i) => i.id === data.messageToUser.id) &&
      user &&
      window.innerWidth >= 900
    ) {
      setNumberMsg((curr) => curr + 1);
    }
  }, [data, user, discussion]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (window.innerWidth < 900) {
      navigate("/subscription-graphql/landing/messages");
      return;
    }
    setAnchorEl(event.currentTarget);
    setNumberMsg(0);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleSelect = (
    data: GetDiscussionCurrentUser_getDiscussionCurrentUser
  ) => {
    dispatchDiscussion({
      type: "add discussion",
      value: {
        ...data,
        newMessageNbr: 0,
        openMessage: true,
        userDiscuss: determineUserOrGroup(
          user as login_login_data,
          data.User,
          data.Receiver,
          data.DiscussGroup
        ),
      },
    });
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
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 1 }}>
          <FirstpageMessage
            data={data}
            onSelect={handleSelect}
            messageData={messageData}
            refetchMessageData={refetchMessageData}
            onClose={handleClose}
          />
        </Box>
      </Popover>
    </div>
  );
};
