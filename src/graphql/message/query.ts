import { gql } from "@apollo/client";

export const MESSAGE_TWO_USER = gql`
  query MessageTwoUser($discussionId: Float!, $cursor: Float) {
    messageTwoUser(discussionId: $discussionId, cursor: $cursor) {
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
  }
`;

// export const MESSAGES_CURRENT_USER = gql`
//   query MessagesOfCurrentUser($userId: Float!) {
//     messagesOfCurrentUser(userId: $userId) {
//       User {
//         id
//         firstname
//         lastname
//         photo
//       }
//       Receiver {
//         id
//         firstname
//         lastname
//         photo
//       }
//       DiscussGroup {
//         id
//         groupName
//         coverPhoto
//       }
//       image
//       content
//       id
//     }
//   }
// `;
