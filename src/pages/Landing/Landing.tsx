import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { PostCreateForm } from "../../components/form/PostCreatForm/PostCreateForm";
import { usePost } from "../../hooks/post/usePost";
import loading from "../../assets/loadingApp.svg";
import { PostCard } from "../../components/card/PostCard";

export default function Landing() {
  const { allPost, postLoading } = usePost();
  console.log(allPost?.getOrderPost);
  return (
    <Container>
      <PostCreateForm />
      {allPost &&
        allPost.getOrderPost.map((value) => (
          <PostCard
            post={value}
            sx={{ p: 2, width: { xs: "100%", md: 500 }, my: 1 }}
          />
        ))}
    </Container>
  );
}
