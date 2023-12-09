import { gql } from "@apollo/client";

export const POST_COMMENT = gql`
  query GetCommentByPost($postId: Float!, $cursor: Float) {
    getCommentByPost(postId: $postId, cursor: $cursor) {
      success
      message
      data {
        image
        content
        id
        User {
          firstname
          lastname
          photo
        }
        createdAt
        updatedAt
      }
    }
  }
`;
