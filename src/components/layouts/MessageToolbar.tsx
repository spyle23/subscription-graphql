import MailIcon from "@mui/icons-material/Mail";
import { Badge, IconButton, Popover, Typography, Box } from "@mui/material";
import React, { useEffect, useMemo, useState, useContext } from "react";
import { FirstpageMessage } from "../../pages/Message/components/FirstpageMessage";
import { useMessage } from "../../hooks/message/useMessage";
import { MessageContext } from "../../pages/Message/Message";
import { MessageContexteType } from "../../types/message";
import { DiscussionContext } from "../../contexts/message";

export const MessageToolbar = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [numberMsg, setNumberMsg] = useState<number>(0);
  const {
    data,
    messageData,
    refetch,
    refetchMessageData,
    messageTwoUser,
    currentMessage,
    dispatch,
  } = useMessage();
  const { dispatchDiscussion } = useContext(DiscussionContext);
  // const navigate = useNavigate();

  const memoizedMessage: MessageContexteType = useMemo(
    () => ({
      currentMessage,
      dispatch,
    }),
    [currentMessage, dispatch]
  );
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
          <MessageContext.Provider value={memoizedMessage}>
            <FirstpageMessage
              messageData={messageData}
              refetch={refetch}
              refetchMessageData={refetchMessageData}
              onClose={handleClose}
            />
          </MessageContext.Provider>
        </Box>
      </Popover>
    </div>
  );
};
