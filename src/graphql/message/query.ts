import { gql } from "@apollo/client";

export const MESSAGE_TWO_USER = gql`
  query MessageTwoUser(
    $userId: Float!
    $receiverId: Float
    $discussGroupId: Float
  ) {
    messageTwoUser(
      userId: $userId
      receiverId: $receiverId
      discussGroupId: $discussGroupId
    ) {
      id
      userId
      User {
        id
        photo
        firstname
        lastname
      }
      image
      receiverId
      discussGroupId
      content
      createdAt
      updatedAt
    }
  }
`;

export const MESSAGES_CURRENT_USER = gql`
  query MessagesOfCurrentUser($userId: Float!) {
    messagesOfCurrentUser(userId: $userId) {
      User {
        id
        firstname
        lastname
        photo
      }
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
      image
      content
      id
    }
  }
`;
