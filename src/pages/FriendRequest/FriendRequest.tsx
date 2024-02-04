import { Container } from "@mui/material";
import { Suggestions } from "./components/Suggestions";
import { Invitations } from "./components/Invitations";
import { SpeedDialMessage } from "../Message/components/SpeedDial";
import { useState } from "react";
import { IAction } from "../Message/components/FirstpageMessage";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";

const FriendRequest = () => {
  const [renders, setRenders] = useState<"Invitations" | "Suggestions">(
    "Invitations"
  );
  const actions: IAction[] = [
    {
      name: "Invitations",
      icon: <PersonAddIcon />,
      onClick: () => setRenders("Invitations"),
    },
    {
      name: "Suggestions",
      icon: <PeopleIcon />,
      onClick: () => setRenders("Suggestions"),
    },
  ];
  return (
    <Container sx={{ height: "90vh", position: "relative" }}>
      {renders === "Invitations" ? <Invitations /> : <Suggestions />}
      <SpeedDialMessage
        ariaLabel="switch renders"
        actions={actions}
        sxBox={{ bottom: 16, right: 16 }}
      />
    </Container>
  );
};

export default FriendRequest;
