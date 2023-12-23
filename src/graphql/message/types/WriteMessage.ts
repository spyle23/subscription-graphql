/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: WriteMessage
// ====================================================

export interface WriteMessage_writeMessage_user {
  __typename: "User";
  photo: string | null;
  id: number;
  lastname: string | null;
  firstname: string | null;
}

export interface WriteMessage_writeMessage {
  __typename: "MessageWrittingObject";
  isWritting: boolean;
  discussionId: number;
  user: WriteMessage_writeMessage_user;
}

export interface WriteMessage {
  writeMessage: WriteMessage_writeMessage;
}

export interface WriteMessageVariables {
  userId: number;
}
