/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MessageTwoUser
// ====================================================

export interface MessageTwoUser_messageTwoUser_User {
  __typename: "User";
  id: number;
  lastname: string | null;
  firstname: string | null;
  photo: string | null;
}

export interface MessageTwoUser_messageTwoUser_files {
  __typename: "FileExt";
  name: string;
  extension: string;
  url: string;
  id: number;
}

export interface MessageTwoUser_messageTwoUser {
  __typename: "MessageWithRecepter";
  id: number;
  User: MessageTwoUser_messageTwoUser_User;
  content: string;
  files: MessageTwoUser_messageTwoUser_files[];
  receiverId: number | null;
  discussGroupId: number | null;
  createdAt: any;
  updatedAt: any;
}

export interface MessageTwoUser {
  messageTwoUser: MessageTwoUser_messageTwoUser[];
}

export interface MessageTwoUserVariables {
  discussionId: number;
  cursor?: number | null;
}
