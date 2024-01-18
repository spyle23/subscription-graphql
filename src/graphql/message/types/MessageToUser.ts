/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: MessageToUser
// ====================================================

export interface MessageToUser_messageToUser_User {
  __typename: "User";
  lastname: string | null;
  firstname: string | null;
  id: number;
  photo: string | null;
  status: boolean;
}

export interface MessageToUser_messageToUser_Receiver {
  __typename: "User";
  firstname: string | null;
  lastname: string | null;
  id: number;
  photo: string | null;
  status: boolean;
}

export interface MessageToUser_messageToUser_DiscussGroup {
  __typename: "GroupWithMembers";
  groupName: string;
  coverPhoto: string | null;
  id: number;
}

export interface MessageToUser_messageToUser_messages_User {
  __typename: "User";
  id: number;
  lastname: string | null;
  firstname: string | null;
  photo: string | null;
}

export interface MessageToUser_messageToUser_messages_files {
  __typename: "FileExt";
  name: string;
  extension: string;
  url: string;
  id: number;
}

export interface MessageToUser_messageToUser_messages {
  __typename: "MessageWithRecepter";
  id: number;
  User: MessageToUser_messageToUser_messages_User;
  content: string;
  files: MessageToUser_messageToUser_messages_files[];
  receiverId: number | null;
  discussGroupId: number | null;
  createdAt: any;
  updatedAt: any;
}

export interface MessageToUser_messageToUser {
  __typename: "DiscussionExtend";
  theme: string;
  createdAt: any;
  updatedAt: any;
  User: MessageToUser_messageToUser_User;
  Receiver: MessageToUser_messageToUser_Receiver | null;
  DiscussGroup: MessageToUser_messageToUser_DiscussGroup | null;
  messages: MessageToUser_messageToUser_messages[];
  id: number;
}

export interface MessageToUser {
  messageToUser: MessageToUser_messageToUser;
}

export interface MessageToUserVariables {
  userId: number;
}
