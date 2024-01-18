import { FC, Fragment, useEffect, useMemo, useRef } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardProps,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { ActionMessageType, MessageGlobalApp } from "../../types/message";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";
import { MessageItem } from "../../pages/Message/components/MessageItem";
import { login_login_data } from "../../graphql/user";
import { MessageForm } from "../../pages/Message/components/MessageForm";
import { MessageInput } from "../../types/graphql-types";
import { SyncLoader } from "react-spinners";
import { useApolloClient, useQuery } from "@apollo/client";
import {
  MESSAGE_TWO_USER,
  MessageToUser_messageToUser,
  MessageTwoUser,
  MessageTwoUserVariables,
  SendMessageDiscoussGroup_sendMessageDiscoussGroup,
} from "../../graphql/message";
import { DiscussionPopover } from "../popover/DiscussionPopover";
import { extractColorFromGradient } from "../../utils/theme";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import { ListenTheme_listenTheme } from "../../graphql/discussion/types/ListenTheme";
import { Waypoint } from "react-waypoint";

type DiscussionCardProps = {
  discussion: MessageGlobalApp;
  listenTheme?: ListenTheme_listenTheme;
  user?: login_login_data;
  messageToUser?: MessageToUser_messageToUser;
  dispatchDiscussion: React.Dispatch<ActionMessageType>;
  sendMessage: (
    data: MessageInput,
    userId: number,
    discussionId: number,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => Promise<SendMessageDiscoussGroup_sendMessageDiscoussGroup | undefined>;
} & CardProps;

export const DiscussionCard: FC<DiscussionCardProps> = ({
  discussion,
  user,
  listenTheme,
  messageToUser,
  dispatchDiscussion,
  sendMessage,
  ...cardProps
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const themeMessage = useMemo(() => {
    return listenTheme?.theme === discussion.theme ? listenTheme : undefined;
  }, [listenTheme, discussion]);
  const colorIcons = extractColorFromGradient(discussion.theme);
  const {
    data: messages,
    loading,
    fetchMore,
  } = useQuery<MessageTwoUser, MessageTwoUserVariables>(MESSAGE_TWO_USER, {
    variables: { discussionId: discussion.id },
    skip: !discussion.id,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (
      scrollRef.current &&
      messages?.messageTwoUser &&
      discussion.openMessage
    ) {
      scrollRef.current.scrollTop =
        messages.messageTwoUser.length === 20
          ? scrollRef.current?.scrollHeight
          : 308;
    }
  }, [messages, discussion]);
  const apolloClient = useApolloClient();

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
        variables: { discussionId: discussion.id },
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
        variables: { discussionId: discussion.id },
      });
    }
    return mess;
  };
  return (
    <Card {...cardProps}>
      <CardHeader
        avatar={<DynamicAvatar sx={{ mr: 0 }} user={discussion.userDiscuss} />}
        title={
          "groupName" in discussion.userDiscuss
            ? discussion.DiscussGroup?.groupName
            : `${discussion.userDiscuss.firstname} ${discussion.userDiscuss.lastname}`
        }
        action={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <DiscussionPopover
              colorIcons={colorIcons}
              theme={discussion.theme}
              currentDiscussion={discussion}
            />
            <IconButton
              onClick={() =>
                dispatchDiscussion({
                  type: "minimize discussion",
                  value: discussion,
                  trigger: false,
                })
              }
            >
              {colorIcons ? (
                <CustomIcon
                  color1={colorIcons[0]}
                  color2={colorIcons[1]}
                  type={
                    discussion.theme.split("-")[0] === "linear"
                      ? "linear"
                      : "radial"
                  }
                  id={`MinimizeIcon`}
                >
                  <MinimizeIcon sx={{ fill: `url(#MinimizeIcon)` }} />
                </CustomIcon>
              ) : (
                <MinimizeIcon sx={{ fill: discussion.theme }} />
              )}
            </IconButton>
            <IconButton
              onClick={() =>
                dispatchDiscussion({
                  type: "delete discussion",
                  value: discussion,
                })
              }
            >
              {colorIcons ? (
                <CustomIcon
                  color1={colorIcons[0]}
                  color2={colorIcons[1]}
                  type={
                    discussion.theme.split("-")[0] === "linear"
                      ? "linear"
                      : "radial"
                  }
                  id={`CloseIcon`}
                >
                  <CloseIcon sx={{ fill: `url(#CloseIcon)` }} />
                </CustomIcon>
              ) : (
                <CloseIcon sx={{ fill: discussion.theme }} />
              )}
            </IconButton>
          </Box>
        }
      />
      <CardContent
        ref={scrollRef}
        sx={{ height: "350px", overflowY: "auto", overflowX: "hidden" }}
      >
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
            <CircularProgress color="primary" />
          </Box>
        )}
        {messages?.messageTwoUser.map((message, index) => (
          <Fragment key={message.id}>
            <MessageItem
              theme={discussion.theme}
              key={message.id}
              message={message}
              user={user}
            />
            {index === 0 && (
              <Waypoint
                onEnter={async () => {
                  console.log("srcollRef", scrollRef.current?.scrollTop);
                  await fetchMore({
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
                  });
                }}
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
        {discussion.writters && discussion.writters.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {discussion.writters.map((val) => (
              <DynamicAvatar key={val.id} user={val} sx={{ mr: 1 }} />
            ))}
            <SyncLoader color={discussion.theme} loading size={5} />
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <MessageForm
          theme={discussion.theme}
          sendMessage={redefineSendMessage}
          discussion={discussion}
          user={user}
        />
      </CardActions>
    </Card>
  );
};
