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
import React, { FC, useState } from "react";
import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { ALL_USER } from "../../graphql/user";
import { AllUser, AllUser_allUser } from "../../graphql/user/types/AllUser";
import { useCreateGroup } from "../../hooks/group/useCreateGroup";
import {
  DiscussGroupInput,
  MessageInput,
  UserChoose,
} from "../../types/graphql-types";
import { useSendMessage } from "../../hooks/message/useSendMessage";
import { useApplicationContext } from "../../hooks";
import { CustomUpload } from "../dropzone/CustomUpload";
import { useUploadForm } from "../../hooks/useUploadForm";
import { ContainerDisplay } from "../media/ContainerDisplay";
import {
  CreateDiscussion,
  CreateDiscussionVariables,
} from "../../graphql/discussion/types/CreateDiscussion";
import { CREATE_DISCUSSION } from "../../graphql/discussion";
import {
  GetDiscussionCurrentUser,
  GetDiscussionCurrentUserVariables,
} from "../../graphql/discussion/types/GetDiscussionCurrentUser";

type NewMessageModalProps = {
  open: boolean;
  refetchMessage: (
    variables?: Partial<GetDiscussionCurrentUserVariables> | undefined
  ) => Promise<ApolloQueryResult<GetDiscussionCurrentUser>>;
  onClose: () => void;
};

export const NewMessageModal: FC<NewMessageModalProps> = ({
  open,
  onClose,
  refetchMessage,
}): JSX.Element => {
  const theme = useTheme();
  const { user } = useApplicationContext();
  const { sendMessage } = useSendMessage();
  const { data: allUser } = useQuery<AllUser>(ALL_USER);
  const { createGroup, data: groupeCreated } = useCreateGroup();
  const [exec, { data }] = useMutation<
    CreateDiscussion,
    CreateDiscussionVariables
  >(CREATE_DISCUSSION);
  const { register, reset, getValues, watch, onFinished } =
    useUploadForm<MessageInput>();
  const [step, setStep] = useState<number>(0);
  const [selected, setSelected] = useState<AllUser_allUser[]>([]);

  const handleDefineStep = async () => {
    if (step === 0) {
      if (selected.length > 1) {
        const data: DiscussGroupInput = {
          groupName: selected.map((user) => user.firstname).join(", "),
        };
        const userChoose: UserChoose = {
          membresId: selected.map((user) => user.id),
        };

        await createGroup(data, user?.id as number, userChoose);
      } else {
        await exec({
          variables: { userId: user?.id as number, receiverId: selected[0].id },
        });
      }
      setStep(1);
      return;
    }
    const messageInput = getValues();
    const newMessageInput: MessageInput = messageInput.files
      ? messageInput
      : { ...messageInput, files: [] };
    await sendMessage(
      user?.id as number,
      newMessageInput,
      groupeCreated
        ? groupeCreated.createDiscussGroup.Discussion.id
        : (data?.createDiscussion.id as number),
      groupeCreated ? null : selected[0].id,
      groupeCreated ? groupeCreated.createDiscussGroup.id : null
    );
    await refetchMessage();
    reset({ content: "", files: [] });
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
              <CustomUpload onFinished={onFinished}>
                <IconButton>
                  <CollectionsIcon sx={{ fill: theme.palette.primary.main }} />
                </IconButton>
              </CustomUpload>
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
            <ContainerDisplay data={watch().files} />
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
