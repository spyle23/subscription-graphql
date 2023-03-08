import { useMutation } from "@apollo/client";
import {
  CreateComment,
  CreateCommentVariables,
  CREATE_COMMENT,
} from "../../graphql/comment";

export const useComment = () => {
  const [commentExec, { loading, error: errorComment }] = useMutation<
    CreateComment,
    CreateCommentVariables
  >(CREATE_COMMENT);

  return {
    commentExec,
    loading,
    errorComment: errorComment?.message,
  };
};
