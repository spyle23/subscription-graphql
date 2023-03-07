import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { PostCreateForm } from "../../components/form/PostCreatForm/PostCreateForm";
import { usePost } from "../../hooks/post/usePost";
import loading from "../../assets/loadingApp.svg";
import { PostCard } from "../../components/card/PostCard";
import { usePostUser } from "../../hooks/post/usePostUser";
import { PostInput } from "../../types/graphql-types";

export default function Landing() {
  const { allPost, postLoading, refetch } = usePost();
  const { createPost } = usePostUser();
  const handleCreatePost = async (data: PostInput, id: number) => {
    await createPost(data, id);
    await refetch();
  };
  return (
    <Container>
      <PostCreateForm createPost={handleCreatePost} />
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
