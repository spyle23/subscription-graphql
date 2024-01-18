import { gql } from "@apollo/client";

export const DISCUSSION_CURRENT_USER = gql`
  query GetDiscussionCurrentUser($userId: Float!, $cursor: Float) {
    getDiscussionCurrentUser(userId: $userId, cursor: $cursor) {
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
