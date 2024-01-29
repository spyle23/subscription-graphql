import { gql } from "@apollo/client";

export const CREATE_DISCUSSION = gql`
  mutation CreateDiscussion($receiverId: Float!, $userId: Float!) {
    createDiscussion(receiverId: $receiverId, userId: $userId) {
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

export const CHANGE_THEME = gql`
  mutation ChangeTheme($data: DiscussionInput!) {
    changeTheme(data: $data) {
      theme
    }
  }
`;
