import { Box, BoxProps, IconButton, TextField, useTheme } from "@mui/material";
import { FC, useCallback } from "react";
import { HeaderMessage } from "./HeaderMessage";
import { MessageItem } from "./MessageItem";
import { MessageActionType } from "../../../types/message";
import {
  MessageToUser_messageToUser,
  MessageTwoUser_messageTwoUser,
} from "../../../graphql/message";
import { MessageInput } from "../../../types/graphql-types";
import { useForm } from "react-hook-form";
import { useFileUploader } from "../../../hooks/application/useFileUploader";
import { useFileDeleter } from "../../../hooks/application/useFileDeleter";
import { useDropzone } from "react-dropzone";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CollectionsIcon from "@mui/icons-material/Collections";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useApplicationContext } from "../../../hooks";

type SecondpageMessageProps = {
  currentMessage: MessageActionType;
  messages: (MessageTwoUser_messageTwoUser | MessageToUser_messageToUser)[];
  sendMessage: (data: MessageInput) => Promise<void>;
} & BoxProps;

export const SecondpageMessage: FC<SecondpageMessageProps> = ({
  currentMessage,
  messages,
  sendMessage,
  ...props
}) => {
  const theme = useTheme();
  const { user } = useApplicationContext();
  const { register, handleSubmit, reset, getValues } = useForm<MessageInput>();
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
    try {
      const currentValues = getValues();
      if (!currentValues.image) return;
      await deleteFile(currentValues.image);
      reset({
        ...currentValues,
        image: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box {...props}>
      <HeaderMessage
        data={currentMessage.userDiscuss}
        group={currentMessage.DiscussGroup}
      />
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
              <CollectionsIcon sx={{ fill: theme.palette.primary.main }} />
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
          <Box sx={{ width: 100, position: "relative" }}>
            <img src={getValues().image || ""} alt="image" width="100%" />
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
  );
};
