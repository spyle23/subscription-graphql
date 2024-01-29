/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignupInput } from "./../../../types/graphql-types";

// ====================================================
// GraphQL mutation operation: signup
// ====================================================

export interface signup_signup_data {
  __typename: "UserWithToken";
  id: number;
  email: string;
  firstname: string | null;
  lastname: string | null;
  status: boolean;
  photo: string | null;
  civilite: string | null;
  createdAt: any;
  updatedAt: any;
  token: string;
}

export interface signup_signup {
  __typename: "LoginResponseForm";
  message: string;
  success: boolean;
  data: signup_signup_data | null;
}

export interface signup {
  signup: signup_signup;
}

export interface signupVariables {
  userInput: SignupInput;
}
