/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: WrittingCheck
// ====================================================

export interface WrittingCheck_writtingCheck {
  __typename: "MessageResponse";
  success: boolean;
  message: string;
}

export interface WrittingCheck {
  writtingCheck: WrittingCheck_writtingCheck;
}

export interface WrittingCheckVariables {
  isWritting: boolean;
  userId: number;
  discussionId: number;
}
