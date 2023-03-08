import { gql } from "@apollo/client";

export const POST_COMMENT = gql`
  query GetCommentByPost($postId: Float!) {
    getCommentByPost(postId: $postId) {
      success
      message
      data {
        image
        content
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
