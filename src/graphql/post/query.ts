import { gql } from "@apollo/client";

export const POST_BY_USER = gql`
  query PostByUser($userId: Float!) {
    postByUser(userId: $userId) {
      id
      userId
      title
      description
      image
      createdAt
      updatedAt
    }
  }
`;
