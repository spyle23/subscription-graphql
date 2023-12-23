import React, { useCallback } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useApplicationContext } from "../../hooks";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useDropzone } from "react-dropzone";
import { useFileUploader } from "../../hooks/application/useFileUploader";
import moment from "moment";
import { civilites } from "../../utils/civilite";
import { useForm } from "react-hook-form";
import { UpdateUserInput } from "../../types/graphql-types";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import { useUpdateUser } from "../../hooks/user/useUpdateUser";
import { LOCALSTORAGE } from "../../constants";
import { usePhotoUrl } from "../../hooks/application/usePhotoUrl";
import { CustomUpload } from "../../components/dropzone/CustomUpload";
import { Upload_upload } from "../../graphql/file";

export const Profile = (): JSX.Element => {
  const theme = useTheme();
  const { user, setUser } = useApplicationContext();
  const { data: userInfo, refetch } = useCurrentUser(user?.id as number);
  const {
    register,
    formState: { errors },
    reset,
    getValues,
    handleSubmit,
  } = useForm<UpdateUserInput>();

  const { updateUser } = useUpdateUser();

  const handleUpdate = async (data: UpdateUserInput) => {
    await updateUser(data);
  };
  const onFinished = async (data: Upload_upload[]) => {
    const values = getValues();
    await updateUser({ ...values, photo: data[0].url });
    const { data: newUser } = await refetch();
    if (user && newUser.profile) {
      setUser({ ...user, photo: newUser.profile?.photo });
    }
  };
  return (
    <Container>
      <Box sx={{ display: "flex", my: 2 }}>
        <Box sx={{ width: 200, height: 200, position: "relative", mr: 2 }}>
          <Avatar
            alt={userInfo?.firstname || "profile"}
            src={usePhotoUrl(userInfo?.photo ?? undefined) || ""}
            sx={{ width: "100%", height: "100%" }}
          />
          <Box
            sx={{
              width: "max-content",
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
          >
            <CustomUpload onFinished={onFinished}>
              <IconButton>
                <CollectionsIcon sx={{ fill: theme.palette.primary.main }} />
              </IconButton>
            </CustomUpload>
          </Box>
        </Box>
        <Box>
          <Typography fontWeight="bold" fontSize="1.5em">
            {userInfo?.firstname}
          </Typography>
          <Typography>{userInfo?.lastname}</Typography>
          <Typography>
            Compte crée le {moment(user?.createdAt).format("DD MMMM YYYY ")}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h4">Information du compte:</Typography>
        <Box sx={{ p: 1 }}>
          <Box sx={{ my: 1 }}>
            <Typography>Addresse email: </Typography>
            <TextField {...register("email")} defaultValue={user?.email} />
          </Box>
          <Box sx={{ my: 1, width: { xs: "max-content", md: 200 } }}>
            <Typography>Civilité</Typography>
            <Autocomplete
              disablePortal
              options={civilites}
              defaultValue={userInfo?.civilite}
              renderInput={(params) => (
                <TextField {...params} {...register("civilite")} />
              )}
            />
          </Box>
          <Button variant="contained" onClick={handleSubmit(handleUpdate)}>
            Valider
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
