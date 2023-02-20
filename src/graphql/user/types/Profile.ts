/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profile
// ====================================================

export interface Profile_profile {
  __typename: "User";
  id: number;
  email: string;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
  civilite: string | null;
}

export interface Profile {
  profile: Profile_profile | null;
}

export interface ProfileVariables {
  userId: number;
}
