import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { FC, useState } from "react";
import { MultiSelect, Option } from "react-multi-select-component";
import { useQuery } from "@apollo/client";

type NewMessageModalProps = {
  open: boolean;
  onClose: () => void;
};

type IUser = {
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
};

const users: IUser[] = [
  {
    id: 1,
    firstname: "jean",
    lastname: "spyle",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0vspXCtrlYE0dfmhUoKMLJzn9NNSZs3dPwTHrOWJTOw&s",
  },
  {
    id: 2,
    firstname: "kassie",
    lastname: "poinsa",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0vspXCtrlYE0dfmhUoKMLJzn9NNSZs3dPwTHrOWJTOw&s",
  },
];


export const NewMessageModal: FC<NewMessageModalProps> = ({
  open,
  onClose,
}): JSX.Element => {
  const [step, setStep] = useState<number>(0);
  const [selected, setSelected] = useState([]);
  const handleDefineStep = () => {
    if (step === 0) {
      setStep(1);
      return;
    }
    console.log("envoyé");
  };
  const handleRetour = () => {
    setStep(0);
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
          </Box>
        ) : (
          <Box>step 2</Box>
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
