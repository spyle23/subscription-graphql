import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $commentInput: CommentInput!
    $postId: Float!
    $userId: Float!
  ) {
    createComment(commentInput: $commentInput, postId: $postId, userId: $userId)
  }
`;
