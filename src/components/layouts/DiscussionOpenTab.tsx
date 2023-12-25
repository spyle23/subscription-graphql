import { useContext, FC, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { DiscussionContext } from "../../contexts/message";
import { DiscussionCard } from "../card/DiscussionCard";
import { useApplicationContext } from "../../hooks";
import { MessageInput } from "../../types/graphql-types";
import { MessageContext } from "../../pages/Message/Message";
import { MessageGlobalApp } from "../../types/message";
import { WriteMessage } from "../../graphql/message/types/WriteMessage";
import {
  MessageToUser,
  SendMessageDiscoussGroup_sendMessageDiscoussGroup,
} from "../../graphql/message";
import { ClosedDiscussion } from "../card/ClosedDiscussion";
import { determineUserOrGroup } from "../../pages/Message/components/PresenterMessage";
import { login_login_data } from "../../graphql/user";
import { ListenTheme } from "../../graphql/discussion/types/ListenTheme";

type DiscussionOpenTabProps = {
  data?: MessageToUser;
  listenTheme?: ListenTheme;
  writting?: WriteMessage;
  sendMessage: (
    data: MessageInput,
    userId: number,
    discussionId: number,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => Promise<SendMessageDiscoussGroup_sendMessageDiscoussGroup | undefined>;
};

export const DiscussionOpenTab: FC<DiscussionOpenTabProps> = ({
  data,
  listenTheme,
  writting,
  sendMessage,
}) => {
  const { discussion, dispatchDiscussion } = useContext(DiscussionContext);
  const { user } = useApplicationContext();

  useEffect(() => {
    if (user && window.innerWidth >= 900) {
      if (data?.messageToUser) {
        dispatchDiscussion({
          type: "add discussion",
          value: {
            ...data.messageToUser,
            newMessageNbr: 1,
            openMessage: true,
            userDiscuss: determineUserOrGroup(
              user,
              data.messageToUser.User,
              data.messageToUser.Receiver,
              data.messageToUser.DiscussGroup
            ),
          },
          data,
        });
      }
    }
  }, [data, user]);
  useEffect(() => {
    if (writting?.writeMessage) {
      dispatchDiscussion({
        type: writting.writeMessage.isWritting
          ? "add Writters"
          : "delete Writters",
        value: {} as MessageGlobalApp,
        writters: writting.writeMessage,
      });
    }
  }, [writting]);
  useEffect(() => {
    if (listenTheme?.listenTheme && user) {
      dispatchDiscussion({
        type: "add discussion",
        value: {
          ...listenTheme.listenTheme,
          newMessageNbr: 0,
          openMessage: true,
          userDiscuss: determineUserOrGroup(
            user,
            listenTheme.listenTheme.User,
            listenTheme.listenTheme.Receiver,
            listenTheme.listenTheme.DiscussGroup
          ),
        },
      });
    }
  }, [listenTheme, user]);
  return (
    <>
      <Grid
        container
        sx={{
          width: "max-content",
          position: "fixed",
          bottom: 0,
          right: "100px",
          justifyContent: "flex-end",
          display: { xs: "none", md: "flex" },
        }}
      >
        {discussion
          .filter((val) => val.openMessage)
          .map((i) => (
            <DiscussionCard
              messageToUser={
                i.id === data?.messageToUser.id ? data.messageToUser : undefined
              }
              listenTheme={
                i.id === listenTheme?.listenTheme.id
                  ? listenTheme.listenTheme
                  : undefined
              }
              discussion={i}
              user={user}
              dispatchDiscussion={dispatchDiscussion}
              sendMessage={sendMessage}
              sx={{ width: "20vw" }}
            />
          ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          minHeight: "350px",
          py: 2,
          width: "100px",
          position: "fixed",
          right: 0,
          bottom: 0,
        }}
      >
        {discussion
          .filter((val) => !val.openMessage)
          .map((i) => (
            <ClosedDiscussion
              i={i}
              messageToUser={
                i.id === data?.messageToUser.id ? data.messageToUser : undefined
              }
              dispatchDiscussion={dispatchDiscussion}
              key={`${i.id}`}
            />
          ))}
      </Box>
    </>
  );
};
