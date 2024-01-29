import { Box } from "@mui/material";
import { PostCreateForm } from "../../../components/form/PostCreatForm/PostCreateForm";
import { useQuery, useSubscription } from "@apollo/client";
import {
  POST_BY_USER,
  PostByUser,
  PostByUserVariables,
} from "../../../graphql/post";
import { useApplicationContext } from "../../../hooks";
import { CommentContext } from "../../Landing/Landing";
import { Fragment, useCallback } from "react";
import { PostCard } from "../../../components/card/PostCard";
import { Waypoint } from "react-waypoint";
import { PostSkeleton } from "../../../components/skeleton/PostSkeleton";
import {
  CommentInput,
  PostInput,
  ReactionInput,
} from "../../../types/graphql-types";
import {
  GetStatusUser,
  GetStatusUserVariables,
} from "../../../graphql/user/types/GetStatusUser";
import { GET_FRIEND_STATUS } from "../../../graphql/user/subscription";
import { usePostUser } from "../../../hooks/post/usePostUser";
import { useReactPost } from "../../../hooks/post/useReactPost";
import { useComment } from "../../../hooks/comment/useComment";
import { useParams } from "react-router-dom";

export const ContainerPost = () => {
  const { user } = useApplicationContext();
  const { id } = useParams();
  const {
    data: postByUser,
    refetch,
    fetchMore,
    loading: postLoading,
  } = useQuery<PostByUser, PostByUserVariables>(POST_BY_USER, {
    variables: { userId: parseFloat(id as string) },
    skip: !id,
    notifyOnNetworkStatusChange: true,
  });
  const { createPost } = usePostUser();
  const { addReact } = useReactPost();
  const { commentExec } = useComment();
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
  return (
    <Box>
      {parseFloat(id as string) === user?.id && (
        <PostCreateForm createPost={handleCreatePost} />
      )}
      <CommentContext.Provider value={{ commentPost: commentPost, data }}>
        {postByUser?.postByUser.map((value, index) => (
          <Fragment key={value.id}>
            <PostCard
              key={value.id}
              user={user}
              addReact={addReactToPost}
              post={value}
              sx={{ p: 2, width: { xs: 350, md: 500 }, my: 1 }}
            />
            {index === postByUser?.postByUser.length - 1 &&
              postByUser.postByUser.length === 10 && (
                <Waypoint
                  onEnter={() =>
                    fetchMore({
                      variables: {
                        cursor:
                          postByUser.postByUser[
                            postByUser.postByUser.length - 1
                          ].id,
                      },
                      updateQuery(previousQueryResult, { fetchMoreResult }) {
                        if (!fetchMoreResult) return previousQueryResult;
                        return {
                          postByUser: [
                            ...previousQueryResult.postByUser,
                            ...fetchMoreResult.postByUser,
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
    </Box>
  );
};
