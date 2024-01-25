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
          status
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
    $discussionId: Float!
  ) {
    writtingCheck(
      isWritting: $isWritting
      userId: $userId
      discussionId: $discussionId
    ) {
      success
      message
    }
  }
`;
