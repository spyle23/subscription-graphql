/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllUser
// ====================================================

export interface AllUser_allUser {
  __typename: "User";
  id: number;
  lastname: string | null;
  firstname: string | null;
  email: string;
  civilite: string | null;
  photo: string | null;
}

export interface AllUser {
  allUser: AllUser_allUser[];
}
