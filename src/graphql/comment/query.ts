import { gql } from "@apollo/client";

export const POST_COMMENT = gql`
  query GetCommentByPost($postId: Float!, $cursor: Float) {
    getCommentByPost(postId: $postId, cursor: $cursor) {
      success
      message
      data {
        id
        content
        User {
          firstname
          lastname
          photo
          id
          status
        }
        files {
          name
          extension
          url
        }
        updatedAt
        createdAt
      }
    }
  }
`;
