import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CollectionsIcon from "@mui/icons-material/Collections";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import React, { FC, useCallback, useState } from "react";
import { ApolloQueryResult, useQuery } from "@apollo/client";
import { ALL_USER } from "../../graphql/user";
import { AllUser, AllUser_allUser } from "../../graphql/user/types/AllUser";
import { useCreateGroup } from "../../hooks/group/useCreateGroup";
import {
  DiscussGroupInput,
  MessageInput,
  UserChoose,
} from "../../types/graphql-types";
import { useForm } from "react-hook-form";
import { useFileUploader } from "../../hooks/application/useFileUploader";
import { useFileDeleter } from "../../hooks/application/useFileDeleter";
import { useDropzone } from "react-dropzone";
import { useSendMessage } from "../../hooks/message/useSendMessage";
import { useApplicationContext } from "../../hooks";
import {
  MessagesOfCurrentUser,
  MessagesOfCurrentUserVariables,
} from "../../graphql/message/types/MessagesOfCurrentUser";
import { MessageTwoUser, MessageTwoUserVariables } from "../../graphql/message";

type NewMessageModalProps = {
  open: boolean;
  refetchMessage: (
    variables?: Partial<MessagesOfCurrentUserVariables> | undefined
  ) => Promise<ApolloQueryResult<MessagesOfCurrentUser>>;
  refetch: (
    variables?: Partial<MessageTwoUserVariables> | undefined
  ) => Promise<ApolloQueryResult<MessageTwoUser>>;
  onClose: () => void;
};

export const NewMessageModal: FC<NewMessageModalProps> = ({
  open,
  onClose,
  refetch,
  refetchMessage
}): JSX.Element => {
  const theme = useTheme();
  const { user } = useApplicationContext();
  const { sendMessage } = useSendMessage();
  const { data: allUser } = useQuery<AllUser>(ALL_USER);
  const { createGroup, data: groupeCreated } = useCreateGroup();
  const { register, reset, getValues } = useForm<MessageInput>();
  const [step, setStep] = useState<number>(0);
  const [selected, setSelected] = useState<AllUser_allUser[]>([]);
  const { uploadFile } = useFileUploader();
  const { deleteFile } = useFileDeleter();

  const handleDeleteImage = async () => {
    const currentValues = getValues();
    if (!currentValues.image) return;
    await deleteFile(currentValues.image);
    reset({
      ...currentValues,
      image: undefined,
    });
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
      reset({ ...getValues(), image: file });
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleDefineStep = async () => {
    if (step === 0) {
      if (selected.length > 1) {
        const data: DiscussGroupInput = {
          groupName: selected.map((user) => user.firstname).join(", "),
        };
        const userChoose: UserChoose = {
          membresId: selected.map((user) => user.id),
        };

        await createGroup(data, userChoose);
      }
      setStep(1);
      onClose();
      return;
    }
    const messageInput = getValues();
    if (groupeCreated) {
      await sendMessage(
        user?.id as number,
        messageInput,
        null,
        groupeCreated.createDiscussGroup.id
      );
      await refetchMessage();
      await refetch();
      onClose()
      return;
    }
    await sendMessage(user?.id as number, messageInput, selected[0].id, null);
    await refetchMessage();
    await refetch({ userId: user?.id as number });
    onClose();
  };
  const handleRetour = () => {
    setSelected([]);
    setStep(0);
  };

  const handleSelect = (user: AllUser_allUser) => {
    setSelected((prevSelected) => {
      if (prevSelected.find((select) => select.id === user.id)) {
        return prevSelected.filter((select) => select.id !== user.id);
      }
      return [...prevSelected, user];
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ width: { xs: 300, md: 600 } }}>
        nouveau message
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ width: { xs: 300, md: 600 }, minHeight: 300 }}>
        {step === 0 ? (
          <Box>
            <Typography>
              Choisissez le(s) personne(s) à qui vous voulez envoyer un message
            </Typography>
            <Box>
              {allUser?.allUser?.map((user) => (
                <Box key={user.id} sx={{ my: 1 }}>
                  <FormControlLabel
                    control={<Checkbox />}
                    onChange={(
                      event: React.SyntheticEvent<Element, Event>,
                      checked: boolean
                    ) => {
                      handleSelect(user);
                    }}
                    label={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={user.photo || ""} sx={{ mr: 1 }} />
                        <Typography>
                          {user.firstname + " " + user.lastname}
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: "flex" }}>
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
            </Box>
            {getValues().image && (
              <Box sx={{ width: 300, position: "relative" }}>
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
        )}
      </DialogContent>
      <DialogActions>
        {step !== 0 && (
          <Box>
            <Button variant="contained" color="error" onClick={handleRetour}>
              retour
            </Button>
          </Box>
        )}
        <Box>
          <Button variant="contained" onClick={handleDefineStep}>
            {step === 0 ? "suivant" : "envoyer"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
