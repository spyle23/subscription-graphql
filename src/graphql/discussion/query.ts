import { gql } from "@apollo/client";

export const DISCUSSION_CURRENT_USER = gql`
  query GetDiscussionCurrentUser($userId: Float!) {
    getDiscussionCurrentUser(userId: $userId) {
      theme
      createdAt
      updatedAt
      User {
        lastname
        firstname
        id
        photo
      }
      Receiver {
        firstname
        lastname
        id
        photo
      }
      DiscussGroup {
        groupName
        coverPhoto
        id
      }
      id
    }
  }
`;
