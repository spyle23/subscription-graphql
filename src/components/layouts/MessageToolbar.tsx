import { useSubscription } from "@apollo/client";
import MailIcon from "@mui/icons-material/Mail";
import { Badge, IconButton, Popover, Typography, Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LISTEN_MESSAGE,
  MessageToUser,
  MessageToUserVariables,
} from "../../graphql/message";
import { useApplicationContext } from "../../hooks";

export const MessageToolbar = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [numberMsg, setNumberMsg] = useState<number>(0);
  const { user } = useApplicationContext();
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
