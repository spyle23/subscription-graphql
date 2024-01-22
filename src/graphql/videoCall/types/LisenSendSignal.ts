/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: LisenSendSignal
// ====================================================

export interface LisenSendSignal_lisenSendSignal_user {
  __typename: "User";
  id: number;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
  status: boolean;
}

export interface LisenSendSignal_lisenSendSignal {
  __typename: "SendSignalType";
  signal: string;
  receiverId: number;
  user: LisenSendSignal_lisenSendSignal_user;
}

export interface LisenSendSignal {
  lisenSendSignal: LisenSendSignal_lisenSendSignal;
}

export interface LisenSendSignalVariables {
  userId: number;
}
