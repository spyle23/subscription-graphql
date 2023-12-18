import { gql } from "@apollo/client";

export const GET_REQUEST = gql`
  query GetRequest($userId: Float!, $cursor: Float) {
    getRequest(userId: $userId, cursor: $cursor) {
      status
      createdAt
      updatedAt
      id
      User {
        firstname
        lastname
        id
        photo
      }
    }
  }
`;

export const GET_FRIEND = gql`
  query GetFriendOfCurrentUser($userId: Float!, $cursor: Float) {
    getFriendOfCurrentUser(userId: $userId, cursor: $cursor) {
      lastname
      photo
      id
      firstname
    }
  }
`;

export const GET_COMMON_FRIEND = gql`
  query GetCommonFriends($receiverId: Float!, $userId: Float!, $cursor: Float) {
    getCommonFriends(
      receiverId: $receiverId
      userId: $userId
      cursor: $cursor
    ) {
      firstname
      lastname
      id
      photo
    }
  }
`;

export const GET_SUGGESTION = gql`
  query GetSuggestionOfCurrentUser($userId: Float!, $cursor: Float) {
    getSuggestionOfCurrentUser(userId: $userId, cursor: $cursor) {
      lastname
      photo
      firstname
      id
    }
  }
`;
