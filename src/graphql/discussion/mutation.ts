import { gql } from "@apollo/client";

export const CREATE_DISCUSSION = gql`
  mutation CreateDiscussion($receiverId: Float!, $userId: Float!) {
    createDiscussion(receiverId: $receiverId, userId: $userId) {
      theme
      updatedAt
      createdAt
      id
      receiverId
      userId
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
