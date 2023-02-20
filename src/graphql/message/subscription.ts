import { gql } from "@apollo/client";

export const LISTEN_MESSAGE = gql`
  subscription MessageToUser($userId: Float!) {
    messageToUser(userId: $userId) {
      id
      userId
      receiverId
      content
      createdAt
      updatedAt
      discussGroupId
    }
  }
`;
