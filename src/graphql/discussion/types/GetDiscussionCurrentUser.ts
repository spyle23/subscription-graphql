/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDiscussionCurrentUser
// ====================================================

export interface GetDiscussionCurrentUser_getDiscussionCurrentUser_User {
  __typename: "User";
  lastname: string | null;
  firstname: string | null;
  id: number;
  photo: string | null;
  status: boolean;
}

export interface GetDiscussionCurrentUser_getDiscussionCurrentUser_Receiver {
  __typename: "User";
  firstname: string | null;
  lastname: string | null;
  id: number;
  photo: string | null;
  status: boolean;
}

export interface GetDiscussionCurrentUser_getDiscussionCurrentUser_DiscussGroup {
  __typename: "GroupWithMembers";
  groupName: string;
  coverPhoto: string | null;
  id: number;
}

export interface GetDiscussionCurrentUser_getDiscussionCurrentUser_messages_User {
  __typename: "User";
  id: number;
  lastname: string | null;
  firstname: string | null;
  photo: string | null;
  status: boolean;
}

export interface GetDiscussionCurrentUser_getDiscussionCurrentUser_messages_files {
  __typename: "FileExt";
  name: string;
  extension: string;
  url: string;
  id: number;
}

export interface GetDiscussionCurrentUser_getDiscussionCurrentUser_messages {
  __typename: "MessageWithRecepter";
  id: number;
  User: GetDiscussionCurrentUser_getDiscussionCurrentUser_messages_User;
  content: string;
  files: GetDiscussionCurrentUser_getDiscussionCurrentUser_messages_files[];
  receiverId: number | null;
  discussGroupId: number | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetDiscussionCurrentUser_getDiscussionCurrentUser {
  __typename: "DiscussionExtend";
  theme: string;
  createdAt: any;
  updatedAt: any;
  User: GetDiscussionCurrentUser_getDiscussionCurrentUser_User;
  Receiver: GetDiscussionCurrentUser_getDiscussionCurrentUser_Receiver | null;
  DiscussGroup: GetDiscussionCurrentUser_getDiscussionCurrentUser_DiscussGroup | null;
  messages: GetDiscussionCurrentUser_getDiscussionCurrentUser_messages[];
  id: number;
}

export interface GetDiscussionCurrentUser {
  getDiscussionCurrentUser: GetDiscussionCurrentUser_getDiscussionCurrentUser[];
}

export interface GetDiscussionCurrentUserVariables {
  userId: number;
  cursor?: number | null;
}
