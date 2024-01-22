import { gql } from "@apollo/client";

export const LISTEN_CALL = gql`
  subscription ListenCall($userId: Float!) {
    listenCall(userId: $userId) {
      token
      discussion {
        id
        theme
        User {
          id
          firstname
          lastname
          status
          photo
        }
        Receiver {
          id
          status
          firstname
          lastname
          photo
        }
        DiscussGroup {
          id
          groupName
          coverPhoto
        }
      }
    }
  }
`;

export const LISTEN_SEND_SIGNAL = gql`
  subscription LisenSendSignal($userId: Float!) {
    lisenSendSignal(userId: $userId) {
      signal
      receiverId
      user {
        id
        firstname
        lastname
        photo
        status
      }
    }
  }
`;

export const LISTEN_RETURN_SIGNAL = gql`
  subscription LisenReturnSignal($userId: Float!) {
    lisenReturnSignal(userId: $userId) {
      signal
      receiverId
      user {
        id
        firstname
        lastname
        photo
        status
      }
    }
  }
`;

export const LISTEN_LEAVE_CALL = gql`
  subscription LisenLeaveCall($userId: Float!) {
    lisenLeaveCall(userId: $userId) {
      id
      status
      firstname
      lastname
      photo
    }
  }
`;

export const LISTEN_DENIED_CALL = gql`
  subscription Subscription($userId: Float!) {
    deniedCall(userId: $userId)
  }
`;

export const LISTEN_TOOGLE_DEVICES = gql`
  subscription ListenToogleDevices($userId: Float!) {
    listenToogleDevices(userId: $userId) {
      userId
      audio
      video
    }
  }
`;

export const JOIN_ROOM = gql`
  subscription JoinRoom($userId: Float!) {
    joinRoom(userId: $userId) {
      id
      status
      lastname
      firstname
      photo
    }
  }
`;
