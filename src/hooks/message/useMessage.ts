import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { useApplicationContext } from "../application";
import {
  LISTEN_MESSAGE,
  MessageToUser,
  MessageToUserVariables,
  SEND_MESSAGE,
  SendMessageDiscoussGroup,
  SendMessageDiscoussGroupVariables,
  WRITING_MESSAGE,
} from "../../graphql/message";
import {
  WriteMessage,
  WriteMessageVariables,
} from "../../graphql/message/types/WriteMessage";
import { DISCUSSION_CURRENT_USER } from "../../graphql/discussion";
import {
  GetDiscussionCurrentUser,
  GetDiscussionCurrentUserVariables,
} from "../../graphql/discussion/types/GetDiscussionCurrentUser";
import { MessageInput } from "../../types/graphql-types";
import { LISTEN_THEME } from "../../graphql/discussion/subscription";
import { ListenTheme, ListenThemeVariables } from "../../graphql/discussion/types/ListenTheme";

export const useMessage = () => {
  const { user } = useApplicationContext();
  const apolloClient = useApolloClient();
  const { data: messageData, refetch: refetchMessageData } = useQuery<
    GetDiscussionCurrentUser,
    GetDiscussionCurrentUserVariables
  >(DISCUSSION_CURRENT_USER, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });
  const { data } = useSubscription<MessageToUser, MessageToUserVariables>(
    LISTEN_MESSAGE,
    {
      variables: { userId: user?.id as number },
      skip: !user?.id,
    }
  );
  const { data: listenTheme } = useSubscription<ListenTheme, ListenThemeVariables>(
    LISTEN_THEME,
    {
      variables: { userId: user?.id as number },
      skip: !user?.id,
    }
  );
  const { data: writting } = useSubscription<
    WriteMessage,
    WriteMessageVariables
  >(WRITING_MESSAGE, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });

  const [exec] = useMutation<
    SendMessageDiscoussGroup,
    SendMessageDiscoussGroupVariables
  >(SEND_MESSAGE, {
    onCompleted: (data) => {
      if (messageData) {
        const updateData = messageData.getDiscussionCurrentUser.find(
          (i) => i.id === data.sendMessageDiscoussGroup.id
        )
          ? messageData.getDiscussionCurrentUser.map((i) =>
              i.id === data.sendMessageDiscoussGroup.id
                ? { ...i, messages: data.sendMessageDiscoussGroup.messages }
                : i
            )
          : [
              data.sendMessageDiscoussGroup,
              ...messageData.getDiscussionCurrentUser,
            ];
        apolloClient.writeQuery<GetDiscussionCurrentUser>({
          query: DISCUSSION_CURRENT_USER,
          data: {
            getDiscussionCurrentUser: updateData,
          },
        });
      }
    },
  });

  const sendMessage = async (
    data: MessageInput,
    userId: number,
    discussionId: number,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => {
    const { data: messageTwoUser } = await exec({
      variables: {
        messageInput: data,
        discussionId,
        userId,
        receiverId,
        discussGroupId,
      },
    });
    return messageTwoUser?.sendMessageDiscoussGroup;
  };

  return {
    user,
    messageData,
    refetchMessageData,
    sendMessage,
    listenTheme,
    writting,
    data,
  };
};
