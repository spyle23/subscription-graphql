/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: MessageToUser
// ====================================================

export interface MessageToUser_messageToUser {
  __typename: "MessageWithRecepter";
  id: number;
  userId: number;
  receiverId: number | null;
  content: string;
  createdAt: any;
  updatedAt: any;
  discussGroupId: number | null;
}

export interface MessageToUser {
  messageToUser: MessageToUser_messageToUser;
}

export interface MessageToUserVariables {
  userId: number;
}
