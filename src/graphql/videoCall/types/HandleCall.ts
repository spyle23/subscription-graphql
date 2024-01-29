/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: HandleCall
// ====================================================

export interface HandleCall_handleCall_user {
  __typename: "User";
  id: number;
  status: boolean;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
}

export interface HandleCall_handleCall {
  __typename: "ResponseCallType";
  signal: string | null;
  user: HandleCall_handleCall_user;
}

export interface HandleCall {
  handleCall: HandleCall_handleCall;
}

export interface HandleCallVariables {
  userId: number;
}
