import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import { useApplicationContext } from "../../../hooks";
import CollectionsIcon from "@mui/icons-material/Collections";
import React, { useState, FC } from "react";
import { Dropzone } from "../../dropzone/Dropzone";
import { PostInput } from "../../../types/graphql-types";
import { TransitionProps } from "@mui/material/transitions";
import { HeadCard } from "../headCard/HeadCard";
import { DynamicAvatar } from "../../Avatar/DynamicAvatar";
import { ContainerDisplay } from "../../media/ContainerDisplay";
import { useUploadForm } from "../../../hooks/useUploadForm";
import { login_login_data } from "../../../graphql/user";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type PostCreateFormProps = {
  createPost: (data: PostInput, id: number) => Promise<void>;
};

export const PostCreateForm: FC<PostCreateFormProps> = ({
  createPost,
}): JSX.Element => {
  const { user } = useApplicationContext();
  const [uploadPicture, setUploadPicture] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    onFinished,
    dropFile,
  } = useUploadForm<PostInput>();
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
    reset({ description: "", files: [] });
    setUploadPicture(false);
    setOpen(false);
  };
  if (!user) return <></>;
  return (
    <Box>
      <Card
        elevation={1}
        sx={{
          width: { xs: 350, md: 500 },
          p: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton>
          <DynamicAvatar user={user} />
        </IconButton>
        <TextField
          fullWidth
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
              errors.description &&
              "La description est requise pour une publication"
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
                onFinished={onFinished}
                message="Ajouter une image"
                btnSx={{ height: "100%" }}
              />
            </Box>
          )}
          <ContainerDisplay data={watch().files??[]} deleteFile={dropFile} />
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
    </Box>
  );
};
