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
      message
      data {
        id
        userId
        receiverId
        discussGroupId
        content
        createdAt
        updatedAt
      }
      success
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
      content
      id
    }
  }
`;
