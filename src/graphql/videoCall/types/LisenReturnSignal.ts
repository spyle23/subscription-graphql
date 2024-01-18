/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: LisenReturnSignal
// ====================================================

export interface LisenReturnSignal_lisenReturnSignal {
  __typename: "SendSignalType";
  userId: number;
  receiverId: number;
  signal: string;
}

export interface LisenReturnSignal {
  lisenReturnSignal: LisenReturnSignal_lisenReturnSignal;
}

export interface LisenReturnSignalVariables {
  userId: number;
}
