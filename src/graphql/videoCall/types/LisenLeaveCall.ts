/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: LisenLeaveCall
// ====================================================

export interface LisenLeaveCall_lisenLeaveCall {
  __typename: "User";
  id: number;
  status: boolean;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
}

export interface LisenLeaveCall {
  lisenLeaveCall: LisenLeaveCall_lisenLeaveCall;
}

export interface LisenLeaveCallVariables {
  userId: number;
}
