/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: GetStatusUser
// ====================================================

export interface GetStatusUser_getStatusUser {
  __typename: "UserWithStatus";
  status: boolean;
  lastname: string | null;
  firstname: string | null;
  id: number;
  photo: string | null;
}

export interface GetStatusUser {
  getStatusUser: GetStatusUser_getStatusUser;
}

export interface GetStatusUserVariables {
  userId: number;
}
