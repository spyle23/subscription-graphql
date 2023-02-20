/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MessageTwoUser
// ====================================================

export interface MessageTwoUser_messageTwoUser_data {
  __typename: "Message";
  id: number;
  userId: number;
  receiverId: number | null;
  discussGroupId: number | null;
  content: string;
  createdAt: any;
  updatedAt: any;
}

export interface MessageTwoUser_messageTwoUser {
  __typename: "MessageResponse";
  message: string;
  data: MessageTwoUser_messageTwoUser_data[] | null;
  success: boolean;
}

export interface MessageTwoUser {
  messageTwoUser: MessageTwoUser_messageTwoUser;
}

export interface MessageTwoUserVariables {
  userId: number;
  receiverId?: number | null;
  discussGroupId?: number | null;
}
