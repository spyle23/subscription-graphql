import { gql } from "@apollo/client";

export const LISTEN_MESSAGE = gql`
subscription MessageToUser($userId: Float!) {
  messageToUser(userId: $userId) {
    theme
    id
    User {
      firstname
      lastname
      photo
      id
    }
    Receiver {
      id
      lastname
      firstname
      photo
    }
    DiscussGroup {
      id
      groupName
      coverPhoto
    }
    updatedAt
    createdAt
  }
}
`;

export const WRITING_MESSAGE = gql`
  subscription WriteMessage($userId: Float!) {
    writeMessage(userId: $userId) {
      isWritting
      userId
    }
  }
`;
