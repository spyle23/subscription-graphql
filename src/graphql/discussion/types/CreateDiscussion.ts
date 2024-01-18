/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDiscussion
// ====================================================

export interface CreateDiscussion_createDiscussion_User {
  __typename: "User";
  lastname: string | null;
  firstname: string | null;
  id: number;
  photo: string | null;
  status: boolean;
}

export interface CreateDiscussion_createDiscussion_Receiver {
  __typename: "User";
  firstname: string | null;
  lastname: string | null;
  id: number;
  photo: string | null;
  status: boolean;
}

export interface CreateDiscussion_createDiscussion_DiscussGroup {
  __typename: "GroupWithMembers";
  groupName: string;
  coverPhoto: string | null;
  id: number;
}

export interface CreateDiscussion_createDiscussion_messages_User {
  __typename: "User";
  id: number;
  lastname: string | null;
  firstname: string | null;
  photo: string | null;
}

export interface CreateDiscussion_createDiscussion_messages_files {
  __typename: "FileExt";
  name: string;
  extension: string;
  url: string;
  id: number;
}

export interface CreateDiscussion_createDiscussion_messages {
  __typename: "MessageWithRecepter";
  id: number;
  User: CreateDiscussion_createDiscussion_messages_User;
  content: string;
  files: CreateDiscussion_createDiscussion_messages_files[];
  receiverId: number | null;
  discussGroupId: number | null;
  createdAt: any;
  updatedAt: any;
}

export interface CreateDiscussion_createDiscussion {
  __typename: "DiscussionExtend";
  theme: string;
  createdAt: any;
  updatedAt: any;
  User: CreateDiscussion_createDiscussion_User;
  Receiver: CreateDiscussion_createDiscussion_Receiver | null;
  DiscussGroup: CreateDiscussion_createDiscussion_DiscussGroup | null;
  messages: CreateDiscussion_createDiscussion_messages[];
  id: number;
}

export interface CreateDiscussion {
  createDiscussion: CreateDiscussion_createDiscussion;
}

export interface CreateDiscussionVariables {
  receiverId: number;
  userId: number;
}
