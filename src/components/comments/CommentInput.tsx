import React, { FC, useCallback } from "react";
import { CommentInput as CommentInputData } from "../../types/graphql-types";
import { Box, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useApplicationContext } from "../../hooks";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useFileUploader } from "../../hooks/application/useFileUploader";
import { useDropzone } from "react-dropzone";
import { DisplayMedia } from "../media/DisplayMedia";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useFileDeleter } from "../../hooks/application/useFileDeleter";

type CommentInputProps = {
  saveComment: (data: CommentInputData) => Promise<void>;
};

export const CommentInput: FC<CommentInputProps> = React.memo(
  ({ saveComment }) => {
    const { user } = useApplicationContext();
    const { uploadFile } = useFileUploader();
    const { deleteFile } = useFileDeleter();
    const { register, handleSubmit, reset, getValues } =
      useForm<CommentInputData>();

    const createComment = async (data: CommentInputData) => {
      saveComment && (await saveComment(data));
      reset({ content: "", image: undefined });
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
      <Box sx={{ position: "sticky", bottom: 0, background: "white", p: 2 }}>
        {getValues().image && (
          <Box sx={{ background: "grey", p: 1, borderRadius: "15px" }}>
            <Box sx={{ width: "100px", display: "flex", position: "relative" }}>
              <DisplayMedia url={getValues().image ?? ""} />
              <IconButton
                sx={{ position: "absolute", top: 0, right: 0, p: 0 }}
                onClick={handleDeleteImage}
              >
                <CloseOutlinedIcon color="error" />
              </IconButton>
            </Box>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DynamicAvatar user={user} />
          <TextField
            {...register("content", { required: true })}
            sx={{
              width: "100%",
            }}
            InputProps={{
              endAdornment: (
                <div {...getRootProps()}>
                  <IconButton>
                    <input {...getInputProps()} />
                    <CollectionsIcon />
                  </IconButton>
                </div>
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
