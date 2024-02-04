import { Box, BoxProps, CircularProgress, Typography } from "@mui/material";
import { FC, Fragment, useEffect, useMemo, useRef } from "react";
import { HeaderMessage } from "./HeaderMessage";
import { MessageItem } from "./MessageItem";
import { MessageInput } from "../../../types/graphql-types";
import { useApplicationContext } from "../../../hooks";
import { MessageForm } from "./MessageForm";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import { SyncLoader } from "react-spinners";
import { MessageGlobalApp } from "../../../types/message";
import { useApolloClient, useQuery } from "@apollo/client";
import {
  MESSAGE_TWO_USER,
  MessageToUser_messageToUser,
  MessageTwoUser,
  MessageTwoUserVariables,
  SendMessageDiscoussGroup_sendMessageDiscoussGroup,
} from "../../../graphql/message";
import { ListenTheme_listenTheme } from "../../../graphql/discussion/types/ListenTheme";
import { Waypoint } from "react-waypoint";
import { Writting } from "../../../components/animation/Writting";

type SecondpageMessageProps = {
  currentDiscussion: MessageGlobalApp;
  messageToUser?: MessageToUser_messageToUser;
  listenTheme?: ListenTheme_listenTheme;
  sendMessage: (
    data: MessageInput,
    userId: number,
    discussionId: number,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => Promise<SendMessageDiscoussGroup_sendMessageDiscoussGroup | undefined>;
  handleBack: () => void;
} & BoxProps;

export const SecondpageMessage: FC<SecondpageMessageProps> = ({
  currentDiscussion,
  messageToUser,
  listenTheme,
  handleBack,
  sendMessage,
  ...props
}) => {
  const { user } = useApplicationContext();
  const apolloClient = useApolloClient();
  const themeMessage = useMemo(() => {
    return listenTheme?.theme === currentDiscussion.theme
      ? listenTheme
      : undefined;
  }, [listenTheme, currentDiscussion]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const {
    data: messages,
    fetchMore,
    loading,
  } = useQuery<MessageTwoUser, MessageTwoUserVariables>(MESSAGE_TWO_USER, {
    variables: { discussionId: currentDiscussion.id },
    skip: !currentDiscussion.id,
    notifyOnNetworkStatusChange: true,
  });
  useEffect(() => {
    if (
      scrollRef.current &&
      messages?.messageTwoUser &&
      currentDiscussion.openMessage
    ) {
      scrollRef.current.scrollTop =
        messages.messageTwoUser.length === 20
          ? scrollRef.current?.scrollHeight
          : 308;
    }
  }, [messages, currentDiscussion]);
  useEffect(() => {
    if (
      messageToUser &&
      messages &&
      !messages.messageTwoUser.find(
        (i) => i.id === messageToUser.messages[0].id
      )
    ) {
      apolloClient.writeQuery<MessageTwoUser, MessageTwoUserVariables>({
        data: {
          messageTwoUser: [
            ...messages.messageTwoUser,
            ...messageToUser.messages,
          ],
        },
        query: MESSAGE_TWO_USER,
        variables: { discussionId: currentDiscussion.id },
      });
    }
  }, [messageToUser, messages]);

  const redefineSendMessage = async (
    data: MessageInput,
    userId: number,
    discussionId: number,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => {
    const mess = await sendMessage(
      data,
      userId,
      discussionId,
      receiverId,
      discussGroupId
    );
    if (messages?.messageTwoUser && mess) {
      apolloClient.writeQuery<MessageTwoUser, MessageTwoUserVariables>({
        data: {
          messageTwoUser: [...messages.messageTwoUser, ...mess.messages],
        },
        query: MESSAGE_TWO_USER,
        variables: { discussionId: currentDiscussion.id },
      });
    }
    return mess;
  };
  return (
    <Box {...props}>
      <HeaderMessage discussion={currentDiscussion} handleBack={handleBack} />
      <Box ref={scrollRef} sx={{ p: 2, height: "100%", overflowY: "auto" }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        )}
        {messages?.messageTwoUser.map((message, index) => (
          <Fragment key={message.id}>
            <MessageItem
              theme={currentDiscussion.theme}
              key={message.id}
              message={message}
              user={user}
            />
            {index === 0 && (
              <Waypoint
                onEnter={() =>
                  fetchMore({
                    variables: {
                      cursor: messages.messageTwoUser[0].id,
                    },
                    updateQuery(previousQueryResult, { fetchMoreResult }) {
                      if (!fetchMoreResult) return previousQueryResult;
                      return {
                        messageTwoUser: [
                          ...fetchMoreResult.messageTwoUser,
                          ...previousQueryResult.messageTwoUser,
                        ],
                      };
                    },
                  })
                }
              />
            )}
          </Fragment>
        ))}
        {themeMessage && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography component="small" sx={{ fontSize: "0.5em", mr: 1 }}>
              Thème changé en{" "}
            </Typography>
            <Box
              sx={{
                width: "10px",
                height: "10px",
                background: themeMessage.theme,
                borderRadius: "50%",
              }}
            />
          </Box>
        )}
        {currentDiscussion.writters &&
          currentDiscussion.writters.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {currentDiscussion.writters.map((val) => (
                <DynamicAvatar user={val} sx={{ mr: 1 }} />
              ))}
              <Writting dotColor={currentDiscussion.theme} />
            </Box>
          )}
      </Box>
      <Box sx={{ position: "fixed", bottom: 0, background: "white" }}>
        <MessageForm
          theme={currentDiscussion.theme}
          sendMessage={redefineSendMessage}
          discussion={currentDiscussion}
          user={user}
          sx={{ width: "100vw" }}
        />
      </Box>
    </Box>
  );
};
