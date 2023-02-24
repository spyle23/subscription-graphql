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
