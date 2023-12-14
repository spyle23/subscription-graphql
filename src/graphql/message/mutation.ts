import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessageDiscoussGroup(
    $discussionId: Float!
    $userId: Float!
    $messageInput: MessageInput!
    $receiverId: Float
    $discussGroupId: Float
  ) {
    sendMessageDiscoussGroup(
      discussionId: $discussionId
      userId: $userId
      messageInput: $messageInput
      receiverId: $receiverId
      discussGroupId: $discussGroupId
    ) {
      success
      message
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessageById($userId: Float!, $messageId: Float!) {
    deleteMessageById(userId: $userId, messageId: $messageId)
  }
`;

export const MODIFY_MESSAGE = gql`
  mutation ModifyMessage(
    $userId: Float!
    $newMessage: String!
    $messageId: Float!
  ) {
    modifyMessage(
      userId: $userId
      newMessage: $newMessage
      messageId: $messageId
    )
  }
`;

export const WRITTING_CHECK = gql`
  mutation WrittingCheck(
    $isWritting: Boolean!
    $userId: Float!
    $discussGroupId: Float
    $receiverId: Float
  ) {
    writtingCheck(
      isWritting: $isWritting
      userId: $userId
      discussGroupId: $discussGroupId
      receiverId: $receiverId
    ) {
      success
      message
    }
  }
`;
