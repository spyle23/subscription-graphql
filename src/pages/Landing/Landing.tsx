import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { usePost } from "../../hooks/post/usePost";

export default function Landing() {
  const { data, loading, error } = usePost();

  return <Container>
    <Typography>Landing works!</Typography>
  </Container>;
}
