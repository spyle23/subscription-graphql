import { useCallback, FC } from "react";
import { Box, IconButton, TextField, useTheme } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CollectionsIcon from "@mui/icons-material/Collections";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useForm } from "react-hook-form";
import { useFileUploader } from "../../../hooks/application/useFileUploader";
import { useFileDeleter } from "../../../hooks/application/useFileDeleter";
import { useDropzone } from "react-dropzone";
import { MessageInput } from "../../../types/graphql-types";
import { MessageActionType } from "../../../types/message";
import { useMutation } from "@apollo/client";
import { WRITTING_CHECK } from "../../../graphql/message";
import {
  WrittingCheck,
  WrittingCheckVariables,
} from "../../../graphql/message/types/WrittingCheck";
import { login_login_data } from "../../../graphql/user";
import { DisplayMedia } from "../../../components/media/DisplayMedia";

type MessageFormProps = {
  sendMessage: (data: MessageInput, value?: MessageActionType) => Promise<void>;
  discussion: MessageActionType;
  user?: login_login_data;
};

export const MessageForm: FC<MessageFormProps> = ({
  sendMessage,
  discussion,
  user,
}) => {
  const theme = useTheme();
  const { register, handleSubmit, reset, getValues } = useForm<MessageInput>();
  const { uploadFile } = useFileUploader();
  const { deleteFile } = useFileDeleter();
  const [writeMessage] = useMutation<WrittingCheck, WrittingCheckVariables>(
    WRITTING_CHECK
  );
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

  const handleFocus = async (isWritting: boolean) => {
    await writeMessage({
      variables: {
        isWritting: isWritting,
        userId: user?.id as number,
        receiverId:
          discussion.receiverId !== user?.id
            ? discussion.receiverId
            : discussion.userId,
        discussGroupId: discussion.discussGroupId,
      },
    });
  };

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

  const submitMessage = async (data: MessageInput) => {
    await sendMessage(data, discussion);
    reset({ content: "", image: undefined });
  };
  return (
    <Box sx={{ py: 1 }} >
      {getValues().image && (
        <Box
          sx={{
            background: "grey",
            p: 1,
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              width: "100px",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <DisplayMedia url={getValues().image as string} />
            <IconButton
              sx={{ position: "absolute", top: 0, right: 0, p: 0 }}
              onClick={handleDeleteImage}
            >
              <CloseOutlinedIcon color="error" />
            </IconButton>
          </Box>
        </Box>
      )}
      <form
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
        onSubmit={handleSubmit(submitMessage)}
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
          onFocus={async () => await handleFocus(true)}
          onBlur={async () => await handleFocus(false)}
          placeholder="votre message ..."
          sx={{ width: "80%" }}
        />
        <IconButton type="submit">
          <PlayArrowIcon sx={{ fill: theme.palette.primary.main }} />
        </IconButton>
      </form>
    </Box>
  );
};
