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
import { useUploadForm } from "../../../hooks/useUploadForm";
import { CustomUpload } from "../../../components/dropzone/CustomUpload";
import { ContainerDisplay } from "../../../components/media/ContainerDisplay";

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
  const { register, handleSubmit, reset, watch, onFinished, dropFile } =
    useUploadForm<MessageInput>();
  const [writeMessage] = useMutation<WrittingCheck, WrittingCheckVariables>(
    WRITTING_CHECK
  );

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

  const submitMessage = async (data: MessageInput) => {
    await sendMessage(data, discussion);
    reset({ content: "", files: [] });
  };
  return (
    <Box sx={{ py: 1 }}>
      <ContainerDisplay data={watch().files} deleteFile={dropFile} />
      <form
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
        onSubmit={handleSubmit(submitMessage)}
      >
        <CustomUpload onFinished={onFinished}>
          <IconButton>
            <CollectionsIcon />
          </IconButton>
        </CustomUpload>
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
