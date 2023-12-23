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