/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: WriteMessage
// ====================================================

export interface WriteMessage_writeMessage {
  __typename: "MessageWrittingObject";
  isWritting: boolean;
  userId: number;
}

export interface WriteMessage {
  writeMessage: WriteMessage_writeMessage;
}

export interface WriteMessageVariables {
  userId: number;
}
