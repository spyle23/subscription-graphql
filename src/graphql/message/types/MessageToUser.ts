/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: MessageToUser
// ====================================================

export interface MessageToUser_messageToUser_User {
  __typename: "User";
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
  id: number;
}

export interface MessageToUser_messageToUser_Receiver {
  __typename: "User";
  id: number;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
}

export interface MessageToUser_messageToUser_DiscussGroup {
  __typename: "DiscussGroup";
  id: number;
  groupName: string;
  coverPhoto: string | null;
}

export interface MessageToUser_messageToUser {
  __typename: "MessageWithRecepter";
  content: string;
  image: string | null;
  userId: number;
  User: MessageToUser_messageToUser_User;
  id: number;
  receiverId: number | null;
  discussGroupId: number | null;
  Receiver: MessageToUser_messageToUser_Receiver | null;
  DiscussGroup: MessageToUser_messageToUser_DiscussGroup | null;
}

export interface MessageToUser {
  messageToUser: MessageToUser_messageToUser;
}

export interface MessageToUserVariables {
  userId: number;
}
