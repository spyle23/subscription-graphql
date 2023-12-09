import { gql } from "@apollo/client";

export const POST_BY_USER = gql`
  query PostByUser($userId: Float!) {
    postByUser(userId: $userId) {
      id
      userId
      description
      image
      createdAt
      updatedAt
    }
  }
`;

export const POST_ORDER = gql`
  query GetOrderPost($cursor: Float) {
    getOrderPost(cursor: $cursor) {
      description
      image
      id
      user {
        firstname
        lastname
        id
        photo
      }
      comments {
        content
        image
        id
      }
      reactions {
        reactionType
        userId
      }
      createdAt
      updatedAt
    }
  }
`;
