/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSuggestionOfCurrentUser
// ====================================================

export interface GetSuggestionOfCurrentUser_getSuggestionOfCurrentUser {
  __typename: "User";
  lastname: string | null;
  photo: string | null;
  firstname: string | null;
  id: number;
}

export interface GetSuggestionOfCurrentUser {
  getSuggestionOfCurrentUser: GetSuggestionOfCurrentUser_getSuggestionOfCurrentUser[];
}

export interface GetSuggestionOfCurrentUserVariables {
  userId: number;
  cursor?: number | null;
}
