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
import { MessageGlobalApp } from "../../types/message";

type MessageToolbarProps = {
  user?: login_login_data;
  data: MessageToUser | undefined;
  loading: boolean;
  fetchMore: any;
  writting?: WriteMessage;
  messageData: GetDiscussionCurrentUser | undefined;
  refetchMessageData: (
    variables?: Partial<GetDiscussionCurrentUserVariables> | undefined
  ) => Promise<ApolloQueryResult<GetDiscussionCurrentUser>>;
};

export const MessageToolbar: FC<MessageToolbarProps> = ({
  user,
  writting,
  loading,
  fetchMore,
  refetchMessageData,
  messageData,
  data,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [numberMsg, setNumberMsg] = useState<number>(0);
  const { dispatchDiscussion } = useContext(DiscussionContext);
  const [discussions, setDiscussions] = useState<MessageGlobalApp[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.messageToUser && user && window.innerWidth >= 900) {
      setNumberMsg((curr) => curr + 1);
    }
  }, [data, user]);

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

  useEffect(() => {
    if (messageData?.getDiscussionCurrentUser) {
      if (data) {
        setDiscussions((curr) =>
          curr.find((i) => i.id === data.messageToUser.id)
            ? curr.map((i) =>
                i.id === data.messageToUser.id
                  ? {
                      ...i,
                      userDiscuss:
                        "status" in i.userDiscuss
                          ? { ...i.userDiscuss, status: true }
                          : i.userDiscuss,
                      newMessageNbr: i.newMessageNbr + 1,
                      messages: data.messageToUser.messages,
                    }
                  : i
              )
            : [
                {
                  ...data.messageToUser,
                  newMessageNbr: 1,
                  userDiscuss: determineUserOrGroup(
                    user as login_login_data,
                    data.messageToUser.User,
                    data.messageToUser.Receiver,
                    data.messageToUser.DiscussGroup
                  ),
                  openMessage: false,
                },
                ...curr,
              ]
        );
      }
      if (writting) {
        setDiscussions((curr) =>
          curr.find((i) => i.id === writting.writeMessage.discussionId)
            ? curr.map((i) =>
                i.id === writting.writeMessage.discussionId
                  ? {
                      ...i,
                      writters: writting.writeMessage.isWritting
                        ? [writting.writeMessage.user]
                        : undefined,
                    }
                  : i
              )
            : curr
        );
      }
      setDiscussions((curr) => {
        let distance =
          messageData?.getDiscussionCurrentUser.length - curr.length;
        if (
          distance > 0 &&
          distance < messageData.getDiscussionCurrentUser.length
        ) {
          const arrays = messageData.getDiscussionCurrentUser
            .slice(curr.length)
            .map<MessageGlobalApp>((val) => ({
              ...val,
              newMessageNbr: 0,
              userDiscuss: determineUserOrGroup(
                user as login_login_data,
                val.User,
                val.Receiver,
                val.DiscussGroup
              ),
              openMessage: false,
            }));
          return [...curr, ...arrays];
        } else if (distance === messageData.getDiscussionCurrentUser.length) {
          return messageData.getDiscussionCurrentUser.map<MessageGlobalApp>(
            (val) => ({
              ...val,
              newMessageNbr: 0,
              userDiscuss: determineUserOrGroup(
                user as login_login_data,
                val.User,
                val.Receiver,
                val.DiscussGroup
              ),
              openMessage: false,
            })
          );
        }
        return curr;
      });
    }
  }, [messageData, data, writting]);


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
            loading={loading}
            fetchMore={fetchMore}
            discussions={discussions}
            onSelect={handleSelect}
            refetchMessageData={refetchMessageData}
            onClose={handleClose}
          />
        </Box>
      </Popover>
    </div>
  );
};
