/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MessageInput } from "./../../../types/graphql-types";

// ====================================================
// GraphQL mutation operation: SendMessageDiscoussGroup
// ====================================================

export interface SendMessageDiscoussGroup_sendMessageDiscoussGroup_User {
  __typename: "User";
  lastname: string | null;
  firstname: string | null;
  id: number;
  photo: string | null;
  status: boolean;
}

export interface SendMessageDiscoussGroup_sendMessageDiscoussGroup_Receiver {
  __typename: "User";
  firstname: string | null;
  lastname: string | null;
  id: number;
  photo: string | null;
  status: boolean;
}

export interface SendMessageDiscoussGroup_sendMessageDiscoussGroup_DiscussGroup {
  __typename: "GroupWithMembers";
  groupName: string;
  coverPhoto: string | null;
  id: number;
}

export interface SendMessageDiscoussGroup_sendMessageDiscoussGroup_messages_User {
  __typename: "User";
  id: number;
  lastname: string | null;
  firstname: string | null;
  photo: string | null;
  status: boolean;
}

export interface SendMessageDiscoussGroup_sendMessageDiscoussGroup_messages_files {
  __typename: "FileExt";
  name: string;
  extension: string;
  url: string;
  id: number;
}

export interface SendMessageDiscoussGroup_sendMessageDiscoussGroup_messages {
  __typename: "MessageWithRecepter";
  id: number;
  User: SendMessageDiscoussGroup_sendMessageDiscoussGroup_messages_User;
  content: string;
  files: SendMessageDiscoussGroup_sendMessageDiscoussGroup_messages_files[];
  receiverId: number | null;
  discussGroupId: number | null;
  createdAt: any;
  updatedAt: any;
}

export interface SendMessageDiscoussGroup_sendMessageDiscoussGroup {
  __typename: "DiscussionExtend";
  theme: string;
  createdAt: any;
  updatedAt: any;
  User: SendMessageDiscoussGroup_sendMessageDiscoussGroup_User;
  Receiver: SendMessageDiscoussGroup_sendMessageDiscoussGroup_Receiver | null;
  DiscussGroup: SendMessageDiscoussGroup_sendMessageDiscoussGroup_DiscussGroup | null;
  messages: SendMessageDiscoussGroup_sendMessageDiscoussGroup_messages[];
  id: number;
}

export interface SendMessageDiscoussGroup {
  sendMessageDiscoussGroup: SendMessageDiscoussGroup_sendMessageDiscoussGroup;
}

export interface SendMessageDiscoussGroupVariables {
  discussionId: number;
  userId: number;
  messageInput: MessageInput;
  receiverId?: number | null;
  discussGroupId?: number | null;
}
