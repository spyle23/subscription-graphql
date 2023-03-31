import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, {
  createContext,
  useMemo,
  useReducer,
  useState,
  useEffect,
  Reducer,
  useCallback,
} from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CollectionsIcon from "@mui/icons-material/Collections";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  LISTEN_MESSAGE,
  MESSAGES_CURRENT_USER,
  MessageToUser,
  MessageToUserVariables,
  MessageToUser_messageToUser,
  MessageTwoUser,
  MessageTwoUserVariables,
  MESSAGE_TWO_USER,
  SendMessageDiscussGroup,
  SendMessageDiscussGroupVariables,
  SEND_MESSAGE,
} from "../../graphql/message";
import {
  MessagesOfCurrentUser,
  MessagesOfCurrentUserVariables,
  MessagesOfCurrentUser_messagesOfCurrentUser,
  MessagesOfCurrentUser_messagesOfCurrentUser_Receiver,
  MessagesOfCurrentUser_messagesOfCurrentUser_User,
} from "../../graphql/message/types/MessagesOfCurrentUser";
import { useApplicationContext } from "../../hooks";
import { ContainerMessage } from "./components/ContainerMessage";
import { HeaderMessage } from "./components/HeaderMessage";
import { MessageItem } from "./components/MessageItem";
import { useForm } from "react-hook-form";
import { MessageInput } from "../../types/graphql-types";
import { useDropzone } from "react-dropzone";
import { useFileUploader } from "../../hooks/application/useFileUploader";
import { useFileDeleter } from "../../hooks/application/useFileDeleter";

type MessageActionType = {
  openMessage: boolean;
  userDiscuss?:
    | MessagesOfCurrentUser_messagesOfCurrentUser_User
    | MessagesOfCurrentUser_messagesOfCurrentUser_Receiver
    | null;
  receiverId?: number;
  userId?: number;
  discussGroupId?: number;
};

type MessageContexteType = {
  currentMessage: MessageActionType;
  dispatch: React.Dispatch<ActionType>;
};

type ActionType = {
  type: string;
  value:
    | MessagesOfCurrentUser_messagesOfCurrentUser
    | MessageToUser_messageToUser;
  userDiscuss:
    | MessagesOfCurrentUser_messagesOfCurrentUser_User
    | MessagesOfCurrentUser_messagesOfCurrentUser_Receiver
    | null;
};

const initialValue: MessageActionType = {
  openMessage: false,
  receiverId: undefined,
  userId: undefined,
};

const reducerMessage = (
  state: MessageActionType,
  action: ActionType
): MessageActionType => {
  switch (action.type) {
    case "select message":
      return {
        openMessage: true,
        receiverId: action.value.Receiver?.id,
        userId: action.value.User?.id,
        discussGroupId: action.value.DiscussGroup?.id,
        userDiscuss: action.userDiscuss,
      };
    default:
      return initialValue;
  }
};

export const MessageContext = createContext<MessageContexteType>(
  {} as MessageContexteType
);

export const Message = (): JSX.Element => {
  const theme = useTheme();
  const [messageExec, { error }] = useMutation<
    SendMessageDiscussGroup,
    SendMessageDiscussGroupVariables
  >(SEND_MESSAGE);
  const { user } = useApplicationContext();
  const { data: messageData, refetch: refetchMessageData } = useQuery<
    MessagesOfCurrentUser,
    MessagesOfCurrentUserVariables
  >(MESSAGES_CURRENT_USER, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });
  const [currentMessage, dispatch] = useReducer<
    Reducer<MessageActionType, ActionType>
  >(reducerMessage, initialValue);
  const { data } = useSubscription<MessageToUser, MessageToUserVariables>(
    LISTEN_MESSAGE,
    {
      variables: { userId: user?.id as number },
      skip: !user?.id,
    }
  );
  const memoizedMessage: MessageContexteType = useMemo(
    () => ({
      currentMessage,
      dispatch,
    }),
    [currentMessage, dispatch]
  );
  const { data: messageTwoUser, refetch } = useQuery<
    MessageTwoUser,
    MessageTwoUserVariables
  >(MESSAGE_TWO_USER, {
    variables: {
      userId: memoizedMessage.currentMessage.userId as number,
      receiverId: memoizedMessage.currentMessage.receiverId,
      discussGroupId: memoizedMessage.currentMessage.discussGroupId,
    },
    skip: !memoizedMessage.currentMessage.userId,
  });

  const messages = useMemo(() => {
    if (!messageTwoUser?.messageTwoUser) return [];
    const currentMessages = data?.messageToUser
      ? [...messageTwoUser?.messageTwoUser, data.messageToUser]
      : messageTwoUser?.messageTwoUser;
    return currentMessages;
  }, [messageTwoUser, data]);

  const { register, handleSubmit, reset, getValues } = useForm<MessageInput>();
  const sendMessage = async (data: MessageInput) => {
    await messageExec({
      variables: {
        userId: user?.id as number,
        receiverId: currentMessage.userDiscuss?.id,
        messageInput: data,
      },
    });
    await refetchMessageData();
    await refetch();
  };

  const { uploadFile } = useFileUploader();
  const { deleteFile } = useFileDeleter();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = async () => {
      const file = await uploadFile({
        data: reader.result?.toString() || "",
        type: acceptedFiles[0].type,
        name: acceptedFiles[0].name,
      });
      reset({ ...getValues(), image: file });
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleDeleteImage = async () => {
    const currentValues = getValues();
    if (!currentValues.image) return;
    await deleteFile(currentValues.image);
    reset({
      ...currentValues,
      image: undefined,
    });
  };

  return (
    <Grid container>
      <Grid item md={4} sx={{ p: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            📧 Messages
          </Typography>
        </Box>
        <MessageContext.Provider value={memoizedMessage}>
          <ContainerMessage messageData={messageData} />
        </MessageContext.Provider>
      </Grid>
      <Grid item md={8} sx={{ borderLeft: "1px solid gray" }}>
        {currentMessage.openMessage && (
          <Box sx={{ position: "relative", height: "80vh" }}>
            {currentMessage.userDiscuss && (
              <HeaderMessage data={currentMessage.userDiscuss} />
            )}
            <Box sx={{ p: 2, height: "90%", overflowY: "auto" }}>
              {messages.map((message) => (
                <MessageItem key={message.id} message={message} user={user} />
              ))}
            </Box>
            <Box sx={{ px: 2 }}>
              <form
                style={{ display: "flex", width: "100%" }}
                onSubmit={handleSubmit(sendMessage)}
              >
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <IconButton>
                    <CollectionsIcon
                      sx={{ fill: theme.palette.primary.main }}
                    />
                  </IconButton>
                </div>
                <TextField
                  {...register("content")}
                  InputProps={{
                    sx: {
                      borderRadius: "25px !important",
                    },
                  }}
                  placeholder="votre message ..."
                  sx={{ width: "80%" }}
                />
                <IconButton type="submit">
                  <PlayArrowIcon sx={{ fill: theme.palette.primary.main }} />
                </IconButton>
              </form>
              {getValues().image && (
                <Box sx={{ width: 300, position: "relative" }}>
                  <img src={getValues().image} alt="image" width="100%" />
                  <IconButton
                    sx={{ position: "absolute", top: 10, right: 10 }}
                    onClick={handleDeleteImage}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
