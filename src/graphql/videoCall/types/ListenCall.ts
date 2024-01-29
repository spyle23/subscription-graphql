/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ListenCall
// ====================================================

export interface ListenCall_listenCall_discussion_User {
  __typename: "User";
  id: number;
  firstname: string | null;
  lastname: string | null;
  status: boolean;
  photo: string | null;
}

export interface ListenCall_listenCall_discussion_Receiver {
  __typename: "User";
  id: number;
  status: boolean;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
}

export interface ListenCall_listenCall_discussion_DiscussGroup {
  __typename: "GroupWithMembers";
  id: number;
  groupName: string;
  coverPhoto: string | null;
}

export interface ListenCall_listenCall_discussion {
  __typename: "DiscussionExtend";
  id: number;
  theme: string;
  User: ListenCall_listenCall_discussion_User;
  Receiver: ListenCall_listenCall_discussion_Receiver | null;
  DiscussGroup: ListenCall_listenCall_discussion_DiscussGroup | null;
}

export interface ListenCall_listenCall {
  __typename: "ListenCallObject";
  token: string;
  discussion: ListenCall_listenCall_discussion;
}

export interface ListenCall {
  listenCall: ListenCall_listenCall;
}

export interface ListenCallVariables {
  userId: number;
}
