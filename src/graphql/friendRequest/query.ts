import { gql } from "@apollo/client";

export const GET_REQUEST = gql`
  query GetRequest($userId: Float!, $cursor: Float) {
    getRequest(userId: $userId, cursor: $cursor) {
      status
      createdAt
      updatedAt
      id
      User {
        firstname
        lastname
        id
        photo
      }
    }
  }
`;