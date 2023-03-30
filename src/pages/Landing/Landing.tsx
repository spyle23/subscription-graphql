import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { PostCreateForm } from "../../components/form/PostCreatForm/PostCreateForm";
import { usePost } from "../../hooks/post/usePost";
import loading from "../../assets/loadingApp.svg";
import { PostCard } from "../../components/card/PostCard";
import { usePostUser } from "../../hooks/post/usePostUser";
import {
  CommentInput,
  PostInput,
  ReactionInput,
} from "../../types/graphql-types";
import { useReactPost } from "../../hooks/post/useReactPost";
import { useApplicationContext } from "../../hooks";
import { createContext, useCallback, useEffect } from "react";
import { useComment } from "../../hooks/comment/useComment";
import { useSubscription } from "@apollo/client";
import {
  LISTEN_MESSAGE,
  MessageToUser,
  MessageToUserVariables,
} from "../../graphql/message";
type CommentGen = {
  commentPost?: (postId: number, commentInput: CommentInput) => Promise<void>;
};
export const CommentContext = createContext<CommentGen>({});

export default function Landing() {
  const { allPost, postLoading, refetch } = usePost();
  const { user, dispatchSnack } = useApplicationContext();
  const { createPost } = usePostUser();
  const { addReact } = useReactPost();
  const { commentExec, loading: commentLoading, errorComment } = useComment();
  const addReactToPost = useCallback(
    async (postId: number, reactionType: ReactionInput) => {
      await addReact(postId, user?.id as number, reactionType);
      await refetch();
    },
    [user]
  );

  const { data } = useSubscription<MessageToUser, MessageToUserVariables>(
    LISTEN_MESSAGE,
    {
      variables: { userId: user?.id as number },
      skip: !user?.id,
    }
  );

  useEffect(() => {
    if (data?.messageToUser) {
      dispatchSnack({
        open: true,
        severity: "info",
        withImage: true,
        message: "Nouveau message",
        subtitle: `${
          data.messageToUser.User.firstname +
          " " +
          data.messageToUser.User.lastname
        } vous a envoyé un nouveau message`,
      });
    }
  }, [data]);

  const commentPost = useCallback(
    async (postId: number, commentInput: CommentInput) => {
      await commentExec({
        variables: { postId, userId: user?.id as number, commentInput },
      });
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
      <CommentContext.Provider value={{ commentPost: commentPost }}>
        {allPost?.getOrderPost.map((value) => (
          <PostCard
            key={value.id}
            user={user}
            addReact={addReactToPost}
            post={value}
            sx={{ p: 2, width: { xs: "100%", md: 500 }, my: 1 }}
          />
        ))}
      </CommentContext.Provider>
    </Container>
  );
}
