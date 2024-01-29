import { gql } from "@apollo/client";

export const ALL_USER = gql`
  query AllUser {
    allUser {
      id
      lastname
      firstname
      email
      civilite
      photo
    }
  }
`;

export const PROFILE = gql`
  query Profile($viewerId: Float!, $profilId: Float!) {
    profile(viewerId: $viewerId, profilId: $profilId) {
      user {
        id
        email
        firstname
        lastname
        photo
        civilite
        createdAt
        updatedAt
      }
      friends {
        id
        status
        firstname
        lastname
        photo
      }
      relation {
        id
        status
        receiverId
        userId
      }
    }
  }
`;
