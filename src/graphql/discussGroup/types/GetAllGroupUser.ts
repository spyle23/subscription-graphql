/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllGroupUser
// ====================================================

export interface GetAllGroupUser_getAllGroupUser {
  __typename: "DiscussGroup";
  groupName: string;
  coverPhoto: string | null;
  id: number;
  createdAt: any;
  updatedAt: any;
}

export interface GetAllGroupUser {
  getAllGroupUser: GetAllGroupUser_getAllGroupUser[];
}

export interface GetAllGroupUserVariables {
  userId: number;
}
