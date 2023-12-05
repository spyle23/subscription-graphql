import { gql } from "@apollo/client";

export const LISTEN_MESSAGE = gql`
  subscription MessageToUser($userId: Float!) {
    messageToUser(userId: $userId) {
      content
      image
      userId
      User {
        firstname
        lastname
        photo
        id
      }
      id
      receiverId
      discussGroupId
      Receiver {
        id
        firstname
        lastname
        photo
      }
      DiscussGroup {
        id
        groupName
        coverPhoto
      }
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
