/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SendSignal
// ====================================================

export interface SendSignal {
  sendSignal: string;
}

export interface SendSignalVariables {
  receiverId: number;
  signal: string;
  userId: number;
  audio: boolean;
  video: boolean;
}
