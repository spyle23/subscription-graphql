import React, { FC, useEffect, useCallback } from "react";
import { CommentInput as CommentInputData } from "../../types/graphql-types";
import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useApplicationContext } from "../../hooks";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useFileUploader } from "../../hooks/application/useFileUploader";
import { useDropzone } from "react-dropzone";

type CommentInputProps = {
  saveComment: (data: CommentInputData) => Promise<void>;
};

export const CommentInput: FC<CommentInputProps> = React.memo(
  ({ saveComment }) => {
    const { user } = useApplicationContext();
    const { uploadFile } = useFileUploader();
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      getValues,
    } = useForm<CommentInputData>();

    const createComment = async (data: CommentInputData) => {
      saveComment && (await saveComment(data));
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = async () => {
        const file = await uploadFile({
          data: reader.result?.toString() || "",
          type: acceptedFiles[0].type,
          name: acceptedFiles[0].name,
        });
        if (file) {
          reset({ image: file });
        }
      };
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
    });
    return (
      <Box sx={{ position: "sticky", bottom: 0, background: "white", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DynamicAvatar user={user} />
          <Box>
            <TextField
              {...register("content", { required: true })}
              error={errors.content && true}
              sx={{
                width: { md: 350, xs: 200 },
              }}
              InputProps={{
                sx: {
                  borderRadius: "25px !important",
                },
              }}
              placeholder="Votre commentaire"
              helperText={errors.content && "Veuillez entrer votre commentaire"}
            />
          </Box>
          <IconButton onClick={handleSubmit(createComment)}>
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Box>
        {getValues().image && (
          <Box>
            <img
              src={getValues().image as string}
              alt="comment_photo"
              style={{ width: "100%" }}
            />
          </Box>
        )}
        <Box>
          <div {...getRootProps()}>
            <IconButton>
              <input {...getInputProps()} />
              <CollectionsIcon />
            </IconButton>
          </div>
        </Box>
      </Box>
    );
  }
);
