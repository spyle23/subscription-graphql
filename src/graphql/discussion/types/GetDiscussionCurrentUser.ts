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
}

export interface GetDiscussionCurrentUser_getDiscussionCurrentUser_Receiver {
  __typename: "User";
  firstname: string | null;
  lastname: string | null;
  id: number;
  photo: string | null;
}

export interface GetDiscussionCurrentUser_getDiscussionCurrentUser_DiscussGroup {
  __typename: "GroupWithMembers";
  groupName: string;
  coverPhoto: string | null;
  id: number;
}

export interface GetDiscussionCurrentUser_getDiscussionCurrentUser {
  __typename: "DiscussionExtend";
  theme: string;
  createdAt: any;
  updatedAt: any;
  User: GetDiscussionCurrentUser_getDiscussionCurrentUser_User;
  Receiver: GetDiscussionCurrentUser_getDiscussionCurrentUser_Receiver | null;
  DiscussGroup: GetDiscussionCurrentUser_getDiscussionCurrentUser_DiscussGroup | null;
  id: number;
}

export interface GetDiscussionCurrentUser {
  getDiscussionCurrentUser: GetDiscussionCurrentUser_getDiscussionCurrentUser[];
}

export interface GetDiscussionCurrentUserVariables {
  userId: number;
}
