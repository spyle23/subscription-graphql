import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      success
      data {
        id
        token
        email
        firstname
        lastname
        photo
        civilite
        createdAt
        updatedAt
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($userInput: SignupInput!) {
    signup(userInput: $userInput) {
      message
      success
      data {
        id
        email
        firstname
        lastname
        photo
        civilite
        createdAt
        updatedAt
        token
      }
    }
  }
`;
