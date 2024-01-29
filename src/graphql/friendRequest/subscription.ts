import { gql } from "@apollo/client";

export const REQUEST_NOTIF = gql`
  subscription SendRequestNotif($userId: Float!) {
    sendRequestNotif(userId: $userId) {
      id
      status
      updatedAt
      createdAt
      User {
        firstname
        lastname
        photo
        id
      }
    }
  }
`;
