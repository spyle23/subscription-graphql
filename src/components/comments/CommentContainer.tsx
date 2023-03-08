import { useQuery } from "@apollo/client";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useMemo } from "react";
import {
  GetCommentByPost,
  GetCommentByPostVariables,
  POST_COMMENT,
} from "../../graphql/comment";
import { CommentPresenter } from "./CommentPresenter";

export const CommentContainer = ({ idPost }: { idPost: number }) => {
  const { data, loading, error } = useQuery<
    GetCommentByPost,
    GetCommentByPostVariables
  >(POST_COMMENT, {
    variables: {
      postId: idPost,
    },
  });
  const comments = useMemo(() => data?.getCommentByPost.data, [data]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        width: { xs: "100%", md: 500 },
        height: 300,
        overflowY: "auto",
        position: "relative",
      }}
    >
      {comments?.map((comment, index) => (
        <CommentPresenter key={index} {...comment} />
      ))}
    </Box>
  );
};
