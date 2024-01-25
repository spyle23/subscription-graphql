import { gql } from "@apollo/client";

export const POST_BY_USER = gql`
  query PostByUser($userId: Float!, $cursor: Float) {
    postByUser(userId: $userId, cursor: $cursor) {
      id
      description
      createdAt
      updatedAt
      nbComments
      user {
        lastname
        firstname
        photo
        id
        status
      }
      reactions {
        id
        reactionType
        userId
      }
      files {
        id
        name
        url
        extension
      }
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
        status
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
