import { useSubscription } from "@apollo/client";
import MailIcon from "@mui/icons-material/Mail";
import { Badge, IconButton, Popover, Typography, Box } from "@mui/material";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LISTEN_MESSAGE,
  MessageToUser,
  MessageToUserVariables,
} from "../../graphql/message";
import { POST_SUBSCRIPTION } from "../../graphql/notification/subscription";
import {
  CommentPost,
  CommentPostVariables,
  CommentPost_commentPost,
} from "../../graphql/notification/types/CommentPost";
import { useApplicationContext } from "../../hooks";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";

type NotificationType = {
  nbrNotification: number;
  notifications: CommentPost_commentPost[];
};

const initialValue: NotificationType = {
  nbrNotification: 0,
  notifications: [],
};

export const MessageToolbar = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [numberMsg, setNumberMsg] = useState<number>(0);
  const { user, dispatchSnack } = useApplicationContext();
  const { data: userProfile } = useCurrentUser(user?.id as number);
  const navigate = useNavigate();

  const { data } = useSubscription<MessageToUser, MessageToUserVariables>(
    LISTEN_MESSAGE,
    {
      variables: { userId: user?.id as number },
      skip: !user?.id,
    }
  );

  useEffect(() => {
    if (data?.messageToUser) {
      dispatchSnack({
        open: true,
        severity: "info",
        withImage: true,
        message: "Nouveau message",
        subtitle: `${
          data.messageToUser.User.firstname +
          " " +
          data.messageToUser.User.lastname
        } vous a envoyé un nouveau message`,
      });
      setNumberMsg((prev) => prev + 1);
    }
  }, [data]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    setNumberMsg(0);
    navigate("/subscription-graphql/landing/messages");
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
    </div>
  );
};
