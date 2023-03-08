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
  query GetOrderPost {
    getOrderPost {
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
      createdAt
      updatedAt
    }
  }
`;
