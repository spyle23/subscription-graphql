import React, { useCallback } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
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

export const Profile = (): JSX.Element => {
  const theme = useTheme();
  const { user } = useApplicationContext();

  const { uploadFile } = useFileUploader();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = async () => {
      const file = await uploadFile({
        data: reader.result?.toString() || "",
        type: acceptedFiles[0].type,
        name: acceptedFiles[0].name,
      });
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <Container>
      <Box sx={{ display: "flex", my: 2 }}>
        <Box sx={{ width: 200, height: 200, position: "relative", mr: 2 }}>
          <Avatar
            alt={user?.firstname || "profile"}
            src={user?.photo || ""}
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
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <IconButton>
                <CollectionsIcon sx={{ fill: theme.palette.primary.main }} />
              </IconButton>
            </div>
          </Box>
        </Box>
        <Box>
          <Typography fontWeight="bold" fontSize="1.5em">
            {user?.firstname}
          </Typography>
          <Typography>{user?.lastname}</Typography>
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
            <TextField defaultValue={user?.email} />
          </Box>
          <Box sx={{ my: 1, width: 200 }}>
            <Typography>Civilité</Typography>
            <Autocomplete
              disablePortal
              options={civilites}
              defaultValue={user?.civilite}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
