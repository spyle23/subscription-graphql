import { useCallback, FC, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import {
  GetCommentByPost,
  GetCommentByPostVariables,
  POST_COMMENT,
} from "../../graphql/comment";
import { useApplicationContext } from "../../hooks";
import { useComment } from "../../hooks/comment/useComment";
import { CommentInput as CommentInputData } from "../../types/graphql-types";
import { CommentInput } from "./CommentInput";
import { CommentPresenter } from "./CommentPresenter";

type CommentContainerProps = {
  idPost: number;
};

export const CommentContainer: FC<CommentContainerProps> = ({ idPost }) => {
  const { user, dispatchSnack } = useApplicationContext();
  const { data, loading, error, refetch } = useQuery<
    GetCommentByPost,
    GetCommentByPostVariables
  >(POST_COMMENT, {
    variables: {
      postId: idPost,
    },
  });
  const { commentExec, loading: commentLoading, errorComment } = useComment();

  const saveComment = useCallback(async (data: CommentInputData) => {
    await commentExec({
      variables: {
        postId: idPost,
        userId: user?.id as number,
        commentInput: data,
      },
    });
    await refetch({ postId: idPost });
  }, []);

  useEffect(() => {
    if (errorComment) {
      dispatchSnack({
        open: true,
        severity: "error",
        message: errorComment,
      });
    }
  }, [errorComment]);

  const comments = useMemo(() => data?.getCommentByPost.data, [data]);

  if (loading) {
    return <CircularProgress />;
  }

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
        <CommentPresenter key={index} {...comment} />
      ))}
      <CommentInput saveComment={saveComment} />
    </Box>
  );
};
