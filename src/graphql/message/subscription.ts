import { gql } from "@apollo/client";

export const LISTEN_MESSAGE = gql`
  subscription MessageToUser($userId: Float!) {
    messageToUser(userId: $userId) {
      theme
      createdAt
      updatedAt
      User {
        lastname
        firstname
        id
        photo
        status
      }
      Receiver {
        firstname
        lastname
        id
        photo
        status
      }
      DiscussGroup {
        groupName
        coverPhoto
        id
      }
      messages {
        id
        User {
          id
          lastname
          firstname
          photo
        }
        content
        files {
          name
          extension
          url
          id
        }
        receiverId
        discussGroupId
        createdAt
        updatedAt
      }
      id
    }
  }
`;

export const WRITING_MESSAGE = gql`
  subscription WriteMessage($userId: Float!) {
    writeMessage(userId: $userId) {
      isWritting
      discussionId
      user {
        photo
        id
        lastname
        firstname
        status
      }
    }
  }
`;
