import { gql } from "@apollo/client";

export const PROFILE = gql`
  query Profile($userId: Float!) {
    profile(userId: $userId) {
      id
      email
      firstname
      lastname
      photo
      civilite
      Post {
        description
        image
      }
      notifications {
        name
        description
        createdAt
        updatedAt
      }
    }
  }
`;
