import { gql } from "@apollo/client";

export const POST_BY_USER = gql`
  query PostByUser($userId: Float!) {
    postByUser(userId: $userId) {
      reactions {
        reactionType
        userId
        id
      }
      files {
        name
        extension
        id
        url
      }
      description
      createdAt
      updatedAt
      id
    }
  }
`;

export const POST_ORDER = gql`
  query GetOrderPost($cursor: Float) {
    getOrderPost(cursor: $cursor) {
      user {
        lastname
        firstname
        photo
        id
      }
      reactions {
        reactionType
        userId
      }
      nbComments
      description
      id
      files {
        name
        extension
        id
        url
      }
      createdAt
      updatedAt
    }
  }
`;
