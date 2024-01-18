import Container from "@mui/material/Container";
import { PostCreateForm } from "../../components/form/PostCreatForm/PostCreateForm";
import { usePost } from "../../hooks/post/usePost";
import { PostCard } from "../../components/card/PostCard";
import { usePostUser } from "../../hooks/post/usePostUser";
import {
  CommentInput,
  PostInput,
  ReactionInput,
} from "../../types/graphql-types";
import { useReactPost } from "../../hooks/post/useReactPost";
import { useApplicationContext } from "../../hooks";
import { Fragment, createContext, useCallback, useEffect } from "react";
import { useComment } from "../../hooks/comment/useComment";
import { useApolloClient, useSubscription } from "@apollo/client";
import {
  LISTEN_MESSAGE,
  MessageToUser,
  MessageToUserVariables,
} from "../../graphql/message";
import { PostSkeleton } from "../../components/skeleton/PostSkeleton";
import { Waypoint } from "react-waypoint";
import { Box, Grid } from "@mui/material";
import { Contact } from "./components/Contact";
import { GET_FRIEND_STATUS } from "../../graphql/user/subscription";
import {
  GetStatusUser,
  GetStatusUserVariables,
} from "../../graphql/user/types/GetStatusUser";
import { POST_ORDER } from "../../graphql/post";
import {
  GetOrderPost,
  GetOrderPostVariables,
} from "../../graphql/post/types/GetOrderPost";
type CommentGen = {
  data?: GetStatusUser;
  commentPost?: (postId: number, commentInput: CommentInput) => Promise<void>;
};
export const CommentContext = createContext<CommentGen>({});

export default function Landing() {
  const { allPost, postLoading, refetch, fetchMore } = usePost();
  const { user } = useApplicationContext();
  const { createPost } = usePostUser();
  const { addReact } = useReactPost();
  const { commentExec, loading: commentLoading, errorComment } = useComment();
  const apolloClient = useApolloClient();
  const addReactToPost = useCallback(
    async (postId: number, reactionType: ReactionInput) => {
      await addReact(postId, user?.id as number, reactionType);
      await refetch();
    },
    [user]
  );
  const { data } = useSubscription<GetStatusUser, GetStatusUserVariables>(
    GET_FRIEND_STATUS,
    { variables: { userId: user?.id as number }, skip: !user?.id }
  );

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

  useEffect(() => {
    if (
      data &&
      allPost &&
      allPost.getOrderPost.find(
        (a) =>
          a.user.id === data.getStatusUser.id &&
          a.user.status !== data.getStatusUser.status
      )
    ) {
      apolloClient.writeQuery<GetOrderPost, GetOrderPostVariables>({
        query: POST_ORDER,
        data: {
          getOrderPost: allPost.getOrderPost.map((val) =>
            val.user.id === data.getStatusUser.id
              ? { ...val, user: data.getStatusUser }
              : val
          ),
        },
      });
    }
  }, [data, allPost]);
  return (
    <Grid container sx={{ alignItems: "center", flexDirection: "column" }}>
      <PostCreateForm createPost={handleCreatePost} />
      <CommentContext.Provider value={{ commentPost: commentPost, data }}>
        {allPost?.getOrderPost.map((value, index) => (
          <Fragment key={value.id}>
            <PostCard
              key={value.id}
              user={user}
              addReact={addReactToPost}
              post={value}
              sx={{ p: 2, width: { xs: 350, md: 500 }, my: 1 }}
            />
            {index === allPost?.getOrderPost.length - 1 &&
              allPost.getOrderPost.length === 10 && (
                <Waypoint
                  onEnter={() =>
                    fetchMore({
                      variables: {
                        cursor:
                          allPost?.getOrderPost[allPost.getOrderPost.length - 1]
                            .id,
                      },
                      updateQuery(previousQueryResult, { fetchMoreResult }) {
                        if (!fetchMoreResult) return previousQueryResult;
                        return {
                          getOrderPost: [
                            ...previousQueryResult.getOrderPost,
                            ...fetchMoreResult.getOrderPost,
                          ],
                        };
                      },
                    })
                  }
                />
              )}
          </Fragment>
        ))}
        {postLoading && [1, 2, 3, 4].map((i) => <PostSkeleton key={i} />)}
      </CommentContext.Provider>
      <Contact data={data} user={user} />
    </Grid>
  );
}
