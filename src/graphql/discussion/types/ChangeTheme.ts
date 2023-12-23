/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DiscussionInput } from "./../../../types/graphql-types";

// ====================================================
// GraphQL mutation operation: ChangeTheme
// ====================================================

export interface ChangeTheme_changeTheme {
  __typename: "Discussion";
  theme: string;
}

export interface ChangeTheme {
  changeTheme: ChangeTheme_changeTheme;
}

export interface ChangeThemeVariables {
  data: DiscussionInput;
}
