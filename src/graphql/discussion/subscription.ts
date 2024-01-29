import { gql } from "@apollo/client";

export const LISTEN_THEME = gql`
  subscription ListenTheme($userId: Float!) {
    listenTheme(userId: $userId) {
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
