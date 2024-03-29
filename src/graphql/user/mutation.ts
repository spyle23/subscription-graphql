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
        status
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
        status
        photo
        civilite
        createdAt
        updatedAt
        token
      }
    }
  }
`;

export const UPDATE_INFO = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!, $userId: Float!) {
    updateUser(updateUserInput: $updateUserInput, userId: $userId)
  }
`;

export const DELETE_FRIEND = gql`
  mutation DeleteFriend($receiverId: Float!, $userId: Float!) {
    deleteFriend(receiverId: $receiverId, userId: $userId)
  }
`;

export const STATUS = gql`
  mutation ChangeStatus($status: Boolean!, $userId: Float!) {
    changeStatus(status: $status, userId: $userId)
  }
`;
