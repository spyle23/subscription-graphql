import { gql } from "@apollo/client";

export const USER_GROUP = gql`
  query GetAllGroupUser($userId: Float!) {
    getAllGroupUser(userId: $userId) {
      groupName
      coverPhoto
      id
      createdAt
      updatedAt
    }
  }
`;
