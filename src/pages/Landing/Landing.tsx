import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { PostCreateForm } from "../../components/form/PostCreatForm/PostCreateForm";
import { usePost } from "../../hooks/post/usePost";
import loading from "../../assets/loadingApp.svg";
import { PostCard } from "../../components/card/PostCard";
import { usePostUser } from "../../hooks/post/usePostUser";
import { PostInput, ReactionInput } from "../../types/graphql-types";
import { useReactPost } from "../../hooks/post/useReactPost";
import { useApplicationContext } from "../../hooks";
import { useCallback } from "react";

export default function Landing() {
  const { allPost, postLoading, refetch } = usePost();
  const { user } = useApplicationContext();
  const { createPost } = usePostUser();
  const { addReact } = useReactPost();
  const addReactToPost = useCallback(
    async (postId: number, reactionType: ReactionInput) => {
      await addReact(postId, user?.id as number, reactionType);
      await refetch();
    },
    [user]
  );
  const handleCreatePost = async (data: PostInput, id: number) => {
    await createPost(data, id);
    await refetch();
  };
  return (
    <Container>
      <PostCreateForm createPost={handleCreatePost} />
      {allPost?.getOrderPost.map((value) => (
        <PostCard
          addReact={addReactToPost}
          post={value}
          sx={{ p: 2, width: { xs: "100%", md: 500 }, my: 1 }}
        />
      ))}
    </Container>
  );
}
