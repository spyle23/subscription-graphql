import {
  useCallback,
  FC,
  useMemo,
  useEffect,
  useContext,
  Fragment,
} from "react";
import { useQuery } from "@apollo/client";
import { Box, Button, Typography } from "@mui/material";
import {
  GetCommentByPost,
  GetCommentByPostVariables,
  POST_COMMENT,
} from "../../graphql/comment";
import { CommentInput as CommentInputData } from "../../types/graphql-types";
import { CommentInput } from "./CommentInput";
import { CommentPresenter } from "./CommentPresenter";
import { CommentContext } from "../../pages/Landing/Landing";
import { CommentSkeleton } from "../skeleton/CommentSkeleton";
import { Waypoint } from "react-waypoint";

type CommentContainerProps = {
  idPost: number;
};

export const CommentContainer: FC<CommentContainerProps> = ({ idPost }) => {
  const { commentPost } = useContext(CommentContext);
  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetCommentByPost,
    GetCommentByPostVariables
  >(POST_COMMENT, {
    variables: {
      postId: idPost,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });
  // const { commentExec, loading: commentLoading, errorComment } = useComment();

  const saveComment = async (data: CommentInputData) => {
    const newData: CommentInputData = data.files
      ? data
      : { ...data, files: [] };
    commentPost && (await commentPost(idPost, newData));
    await refetch({ postId: idPost });
  };

  // useEffect(() => {
  //   if (errorComment) {
  //     dispatchSnack({
  //       open: true,
  //       severity: "error",
  //       message: errorComment,
  //     });
  //   }
  // }, [errorComment]);

  const comments = useMemo(() => data?.getCommentByPost.data, [data]);

  return (
    <Box
      sx={{
        width: { xs: "100%", md: 500 },
        height: comments?.length && comments.length > 2 ? 300 : "max-content",
        overflowY: "auto",
        position: "relative",
      }}
    >
      {comments?.map((comment, index) => (
        <Fragment key={index} >
          <CommentPresenter key={comment.id} {...comment} />
          {index === comments?.length - 1 && comments?.length === 10 && (
            <Waypoint
              onEnter={() =>
                fetchMore({
                  variables: {
                    cursor: comments[comments.length - 1].id,
                  },
                  updateQuery(previousQueryResult, { fetchMoreResult }) {
                    if (!fetchMoreResult.getCommentByPost.data)
                      return previousQueryResult;
                    return {
                      getCommentByPost: {
                        ...previousQueryResult.getCommentByPost,
                        data: previousQueryResult.getCommentByPost.data
                          ? [
                              ...previousQueryResult.getCommentByPost.data,
                              ...fetchMoreResult.getCommentByPost.data,
                            ]
                          : [],
                      },
                    };
                  },
                })
              }
            />
          )}
        </Fragment>
      ))}
      {loading && [1, 2, 3].map((i) => <CommentSkeleton key={i} />)}
      <CommentInput saveComment={saveComment} />
    </Box>
  );
};
