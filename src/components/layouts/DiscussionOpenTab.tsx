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
        });
      }
      if (listenTheme?.listenTheme) {
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
    }
    if (writting?.writeMessage) {
      console.log("mandeha ve");
      dispatchDiscussion({
        type: writting.writeMessage.isWritting
          ? "add Writters"
          : "delete Writters",
        value: {} as MessageGlobalApp,
        writters: writting.writeMessage,
      });
    }
  }, [data, user, listenTheme, writting]);
  return (
    <Box
      sx={{
        width: "70%",
        position: "fixed",
        bottom: 0,
        right: 0,
        display: discussion.length > 0 ? "flex" : "none",
        justifyContent: "space-between",
      }}
    >
      <Grid container sx={{ width: "90%", justifyContent: "flex-end" }}>
        {discussion
          .filter((val) => val.openMessage)
          .map((i) => (
            <Grid item md={4} key={`${i.id}`} sx={{ p: 1 }}>
              <DiscussionCard
                messageToUser={
                  i.id === data?.messageToUser.id
                    ? data.messageToUser
                    : undefined
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
              />
            </Grid>
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
          width: "10%",
        }}
      >
        {discussion
          .filter((val) => !val.openMessage)
          .map((i) => (
            <ClosedDiscussion
              i={i}
              dispatchDiscussion={dispatchDiscussion}
              key={`${i.id}`}
            />
          ))}
      </Box>
    </Box>
  );
};
