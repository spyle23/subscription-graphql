import { gql } from "@apollo/client";

export const GET_FRIEND_STATUS = gql`
  subscription GetStatusUser($userId: Float!) {
    getStatusUser(userId: $userId) {
      status
      lastname
      firstname
      id
      photo
    }
  }
`;
