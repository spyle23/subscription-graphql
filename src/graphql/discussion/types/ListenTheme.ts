/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ListenTheme
// ====================================================

export interface ListenTheme_listenTheme_User {
  __typename: "User";
  lastname: string | null;
  firstname: string | null;
  id: number;
  photo: string | null;
}

export interface ListenTheme_listenTheme_Receiver {
  __typename: "User";
  firstname: string | null;
  lastname: string | null;
  id: number;
  photo: string | null;
}

export interface ListenTheme_listenTheme_DiscussGroup {
  __typename: "GroupWithMembers";
  groupName: string;
  coverPhoto: string | null;
  id: number;
}

export interface ListenTheme_listenTheme_messages_User {
  __typename: "User";
  id: number;
  lastname: string | null;
  firstname: string | null;
  photo: string | null;
}

export interface ListenTheme_listenTheme_messages_files {
  __typename: "FileExt";
  name: string;
  extension: string;
  url: string;
  id: number;
}

export interface ListenTheme_listenTheme_messages {
  __typename: "MessageWithRecepter";
  id: number;
  User: ListenTheme_listenTheme_messages_User;
  content: string;
  files: ListenTheme_listenTheme_messages_files[];
  receiverId: number | null;
  discussGroupId: number | null;
  createdAt: any;
  updatedAt: any;
}

export interface ListenTheme_listenTheme {
  __typename: "DiscussionExtend";
  theme: string;
  createdAt: any;
  updatedAt: any;
  User: ListenTheme_listenTheme_User;
  Receiver: ListenTheme_listenTheme_Receiver | null;
  DiscussGroup: ListenTheme_listenTheme_DiscussGroup | null;
  messages: ListenTheme_listenTheme_messages[];
  id: number;
}

export interface ListenTheme {
  listenTheme: ListenTheme_listenTheme;
}

export interface ListenThemeVariables {
  userId: number;
}
