/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: LisenReturnSignal
// ====================================================

export interface LisenReturnSignal_lisenReturnSignal_user {
  __typename: "User";
  id: number;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
  status: boolean;
}

export interface LisenReturnSignal_lisenReturnSignal {
  __typename: "SendSignalType";
  signal: string;
  receiverId: number;
  user: LisenReturnSignal_lisenReturnSignal_user;
}

export interface LisenReturnSignal {
  lisenReturnSignal: LisenReturnSignal_lisenReturnSignal;
}

export interface LisenReturnSignalVariables {
  userId: number;
}
