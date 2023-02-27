import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { PostCreateForm } from "../../components/form/PostCreatForm/PostCreateForm";
import { usePost } from "../../hooks/post/usePost";

export default function Landing() {
  const { data, loading, error } = usePost();

  console.log(data);

  return (
    <Container>
      <PostCreateForm />
      {data?.postByUser[7].image && (
        <img src={data?.postByUser[7].image} alt="hugot" />
      )}
    </Container>
  );
}
