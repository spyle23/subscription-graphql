import { gql } from "@apollo/client";

export const GET_VIDEO_CALL = gql`
  query GetVideoCall($token: String!, $userId: Float!) {
    getVideoCall(token: $token, userId: $userId) {
      id
      status
      createdAt
      updatedAt
      members {
        id
        status
        firstname
        lastname
        photo
      }
    }
  }
`;
