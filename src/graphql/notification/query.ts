import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($userId: Float!, $cursor: Float) {
    getNotifications(userId: $userId, cursor: $cursor) {
      id
      name
      description
      updatedAt
      createdAt
    }
  }
`;
