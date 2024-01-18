/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: LisenSendSignal
// ====================================================

export interface LisenSendSignal_lisenSendSignal {
  __typename: "SendSignalType";
  userId: number;
  receiverId: number;
  signal: string;
}

export interface LisenSendSignal {
  lisenSendSignal: LisenSendSignal_lisenSendSignal;
}

export interface LisenSendSignalVariables {
  userId: number;
}
