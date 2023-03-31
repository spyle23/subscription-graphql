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
  photo: string | null;
  firstname: string | null;
  lastname: string | null;
}

export interface MessageTwoUser_messageTwoUser {
  __typename: "MessageWithRecepter";
  id: number;
  userId: number;
  User: MessageTwoUser_messageTwoUser_User;
  image: string | null;
  receiverId: number | null;
  discussGroupId: number | null;
  content: string;
  createdAt: any;
  updatedAt: any;
}

export interface MessageTwoUser {
  messageTwoUser: MessageTwoUser_messageTwoUser[];
}

export interface MessageTwoUserVariables {
  userId: number;
  receiverId?: number | null;
  discussGroupId?: number | null;
}
