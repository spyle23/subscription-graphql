import { gql } from "@apollo/client";

export const POST_SUBSCRIPTION = gql`
  subscription CommentPost($userId: Float!) {
    commentPost(userId: $userId) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
