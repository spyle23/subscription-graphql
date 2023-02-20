import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessageDiscussGroup(
    $userId: Float!
    $messageInput: MessageInput!
    $receiverId: Float
    $discussGroupId: Float
  ) {
    sendMessageDiscoussGroup(
      userId: $userId
      messageInput: $messageInput
      receiverId: $receiverId
      discussGroupId: $discussGroupId
    ) {
      message
      success
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
