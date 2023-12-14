import { gql } from "@apollo/client";

export const SEND_FRIEND_REQUEST = gql`
  mutation SendFriendRequest($receiverId: Float!, $userId: Float!) {
    sendFriendRequest(receiverId: $receiverId, userId: $userId)
  }
`;

export const HANDLE_FRIEND_REQUEST = gql`
  mutation HandleFriendRequest($status: String!, $friendRequestId: Float!) {
    handleFriendRequest(status: $status, friendRequestId: $friendRequestId)
  }
`;
