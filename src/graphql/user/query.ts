import { gql } from "@apollo/client";

export const ALL_USER = gql`
  query AllUser {
    allUser {
      id
      lastname
      firstname
      email
      civilite
      photo
    }
  }
`;

export const PROFILE = gql`
  query Profile($userId: Float!) {
    profile(userId: $userId) {
      id
      email
      firstname
      lastname
      photo
      civilite
      notifications {
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_FRIEND = gql`
  query GetFriends($userId: Float!, $cursor: Float) {
    getFriends(userId: $userId, cursor: $cursor) {
      lastname
      photo
      firstname
      id
    }
  }
`;
