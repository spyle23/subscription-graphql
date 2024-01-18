import { gql } from "@apollo/client";

export const CALL_USER = gql`
  mutation CallUser($discussionId: Float!, $userId: Float!) {
    callUser(discussionId: $discussionId, userId: $userId)
  }
`;

export const HANDLE_CALL = gql`
  mutation HandleCallMutation(
    $status: Boolean!
    $token: String!
    $userId: Float!
  ) {
    handleCallMutation(status: $status, token: $token, userId: $userId)
  }
`;

export const SEND_SIGNAL = gql`
  mutation SendSignal($receiverId: Float!, $signal: String!, $userId: Float!) {
    sendSignal(receiverId: $receiverId, signal: $signal, userId: $userId)
  }
`;

export const RETURN_SIGNAL = gql`
  mutation ReturnSignal($receiverId: Float!, $signal: String!, $userId: Float!) {
    returnSignal(receiverId: $receiverId, signal: $signal, userId: $userId)
  }
`;

export const LEAVE_CALL = gql`
  mutation LeaveCall($token: String!, $userId: Float!) {
    leaveCall(token: $token, userId: $userId)
  }
`;
