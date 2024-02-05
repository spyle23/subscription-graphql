import { useMutation, useSubscription } from "@apollo/client";
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
import { MessageInput } from "../../types/graphql-types";
import { LISTEN_THEME } from "../../graphql/discussion/subscription";
import {
  ListenTheme,
  ListenThemeVariables,
} from "../../graphql/discussion/types/ListenTheme";
import { useEffect } from "react";
import addNotification from "react-push-notification";
import { usePhotoUrl } from "../application/usePhotoUrl";

export const useMessage = () => {
  const { user } = useApplicationContext();
  const { data } = useSubscription<MessageToUser, MessageToUserVariables>(
    LISTEN_MESSAGE,
    {
      variables: { userId: user?.id as number },
      skip: !user?.id,
    }
  );
  const { data: listenTheme } = useSubscription<
    ListenTheme,
    ListenThemeVariables
  >(LISTEN_THEME, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });
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
      // if (messageData) {
      //   const updateData = messageData.getDiscussionCurrentUser.find(
      //     (i) => i.id === data.sendMessageDiscoussGroup.id
      //   )
      //     ? messageData.getDiscussionCurrentUser.map((i) =>
      //         i.id === data.sendMessageDiscoussGroup.id
      //           ? { ...i, messages: data.sendMessageDiscoussGroup.messages }
      //           : i
      //       )
      //     : [
      //         data.sendMessageDiscoussGroup,
      //         ...messageData.getDiscussionCurrentUser,
      //       ];
      //   apolloClient.writeQuery<GetDiscussionCurrentUser>({
      //     query: DISCUSSION_CURRENT_USER,
      //     data: {
      //       getDiscussionCurrentUser: updateData,
      //     },
      //   });
      // }
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

  useEffect(() => {
    if (data?.messageToUser) {
      addNotification({
        title: `${data.messageToUser.messages[0].User.firstname} ${data.messageToUser.messages[0].User.lastname}`,
        message: `${data.messageToUser.messages[0].content}`,
        native: true,
        icon: usePhotoUrl(
          data.messageToUser.messages[0].User.photo ?? undefined
        ),
      });
    }
  }, [data]);

  return {
    user,
    sendMessage,
    listenTheme,
    writting,
    data,
  };
};
