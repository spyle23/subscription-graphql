import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  styled,
  TextField,
} from "@mui/material";
import { useApplicationContext } from "../../../hooks";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import CollectionsIcon from "@mui/icons-material/Collections";
import React, { useState, useCallback } from "react";
import { Dropzone } from "../../dropzone/Dropzone";
import { useForm } from "react-hook-form";
import { PostInput } from "../../../types/graphql-types";
import { Delete } from "@mui/icons-material";
import { usePostUser } from "../../../hooks/post/usePostUser";
import { useFileDeleter } from "../../../hooks/application/useFileDeleter";
import { TransitionProps } from "@mui/material/transitions";
import { HeadCard } from "../headCard/HeadCard";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PostCreateForm = (): JSX.Element => {
  const { user } = useApplicationContext();
  const { createPost } = usePostUser();
  const [uploadPicture, setUploadPicture] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
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
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card elevation={1} sx={{ width: { xs: "100%", md: 500 }, p: 2 }}>
        <IconButton>
          {user?.photo ? (
            <img src={user.photo} alt="profile" />
          ) : (
            <FacebookOutlinedIcon />
          )}
        </IconButton>
        <TextField
          sx={{
            width: { md: 350, xs: 200 },
          }}
          InputProps={{
            sx: {
              borderRadius: "25px !important",
            },
          }}
          onClick={handleClickOpen}
          placeholder="Exprimer vous"
        />
        <IconButton
          onClick={() => {
            setUploadPicture(true);
            handleClickOpen();
          }}
        >
          <CollectionsIcon />
        </IconButton>
      </Card>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <HeadCard />
        </DialogTitle>
        <DialogContent
          sx={{
            pt: "20px !important",
          }}
        >
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
          {uploadPicture && (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                py: 1,
                my: 1,
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
          <Box sx={{ display: "flex" }}>
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
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="contained" onClick={handleSubmit(handlePost)}>
            Publier
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
