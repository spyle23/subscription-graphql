import { Container } from "@mui/material";
import { Suggestions } from "./components/Suggestions";
import { Invitations } from "./components/Invitations";

const FriendRequest = () => {
  return (
    <Container>
      <Invitations />
      <Suggestions />
    </Container>
  );
};

export default FriendRequest;
