import React, { FC } from "react";
import { CommentInput as CommentInputData, FileInput } from "../../types/graphql-types";
import { Box, IconButton, TextField } from "@mui/material";
import { useApplicationContext } from "../../hooks";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useUploadForm } from "../../hooks/useUploadForm";
import { CustomUpload } from "../dropzone/CustomUpload";
import { ContainerDisplay } from "../media/ContainerDisplay";
import { login_login_data } from "../../graphql/user";

type CommentInputProps = {
  saveComment: (data: CommentInputData) => Promise<void>;
};

export const CommentInput: FC<CommentInputProps> = React.memo(
  ({ saveComment }) => {
    const { user } = useApplicationContext();
    const { register, handleSubmit, reset, onFinished, watch, dropFile } =
      useUploadForm<CommentInputData>();

    const createComment = async (data: CommentInputData) => {
      await saveComment(data);
      reset({ content: "", files: [] });
    };
    return (
      <Box sx={{ position: "sticky", bottom: 0, background: "white", p: 2 }}>
        <ContainerDisplay data={watch().files ? (watch().files as FileInput[]) : []} deleteFile={dropFile} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DynamicAvatar user={user as login_login_data } />
          <TextField
            {...register("content", { required: true })}
            sx={{
              width: "100%",
            }}
            InputProps={{
              endAdornment: (
                <CustomUpload onFinished={onFinished}>
                  <IconButton>
                    <CollectionsIcon />
                  </IconButton>
                </CustomUpload>
              ),
              sx: {
                borderRadius: "25px !important",
              },
            }}
            placeholder="Votre commentaire"
          />
          <IconButton onClick={handleSubmit(createComment)}>
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }
);
