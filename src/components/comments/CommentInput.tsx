import React, { FC, useEffect } from "react";
import { CommentInput as CommentInputData } from "../../types/graphql-types";
import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, IconButton, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useApplicationContext } from "../../hooks";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import CollectionsIcon from "@mui/icons-material/Collections";

type CommentInputProps = {
  saveComment: (data: CommentInputData) => Promise<void>;
};

export const CommentInput: FC<CommentInputProps> = React.memo(
  ({ saveComment }) => {
    const { user } = useApplicationContext();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<CommentInputData>();

    const createComment = async (data: CommentInputData) => {
      saveComment && (await saveComment(data));
    };
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
        <Box>
          <IconButton>
            <CollectionsIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }
);
