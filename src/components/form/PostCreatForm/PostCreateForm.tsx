import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  styled,
  TextField,
} from "@mui/material";
import { useApplicationContext } from "../../../hooks";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useState, useCallback } from "react";
import { Dropzone } from "../../dropzone/Dropzone";
import { useForm } from "react-hook-form";
import { PostInput } from "../../../types/graphql-types";
import { Delete } from "@mui/icons-material";
import { usePost } from "../../../hooks/post/usePost";
import { useFileDeleter } from "../../../hooks/application/useFileDeleter";

export const PostCreateForm = (): JSX.Element => {
  const { user } = useApplicationContext();
  const { createPost } = usePost();
  const [uploadPicture, setUploadPicture] = useState<boolean>(false);
  const { deleteFile } = useFileDeleter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<PostInput>();

  const handleChangePicture = (file?: string, name?: string) => {
    const currentValues = getValues();
    reset({
      ...currentValues,
      image: file,
    });
  };
  const deletePicture = async () => {
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
  const handlePost = async (data: PostInput) => {
    try {
      if (!user) return;
      await createPost(data, user.id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card elevation={1} sx={{ width: { xs: "100%", md: 500 }, p: 2 }}>
      <IconButton>
        {user?.photo ? (
          <img src={user.photo} alt="profile" />
        ) : (
          <FacebookOutlinedIcon />
        )}
      </IconButton>
      <TextField
        {...register("description", { required: true })}
        error={errors.description && true}
        sx={{
          width: { md: 350, xs: 200 },
        }}
        InputProps={{
          sx: {
            borderRadius: "25px !important",
          },
        }}
        placeholder="Exprimer vous"
        helperText={
          errors.image && "La description est requise pour une publication"
        }
      />
      <IconButton onClick={() => setUploadPicture(true)}>
        <CollectionsIcon />
      </IconButton>
      <Box sx={{ display: "flex", gap: 2 }}>
        {uploadPicture && (
          <Box
            sx={{
              width: 200,
              height: 200,
              py: 1,
              position: "relative",
            }}
          >
            <Dropzone
              onFinished={handleChangePicture}
              message="Ajouter une image"
              btnSx={{ height: "100%" }}
            />
          </Box>
        )}
        {getValues().image && (
          <Box
            sx={{
              width: 150,
              height: 150,
              mr: 1,
              mb: 1,
              position: "relative",
            }}
          >
            <IconButton
              onClick={deletePicture}
              sx={{ position: "absolute", bottom: 5, right: 5 }}
            >
              <Delete color="error" />
            </IconButton>

            <img
              src={getValues().image || ""}
              alt=""
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
            />
          </Box>
        )}
      </Box>
      <Button
        sx={{ my: 1 }}
        variant="contained"
        onClick={handleSubmit(handlePost)}
      >
        Publiez
      </Button>
    </Card>
  );
};
