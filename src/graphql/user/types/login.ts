/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_data {
  __typename: "UserWithToken";
  id: number;
  token: string;
  email: string;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
  civilite: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface login_login {
  __typename: "LoginResponseForm";
  message: string;
  success: boolean;
  data: login_login_data | null;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  email: string;
  password: string;
}
