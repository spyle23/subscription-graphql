/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFriendOfCurrentUser
// ====================================================

export interface GetFriendOfCurrentUser_getFriendOfCurrentUser {
  __typename: "User";
  lastname: string | null;
  photo: string | null;
  id: number;
  firstname: string | null;
}

export interface GetFriendOfCurrentUser {
  getFriendOfCurrentUser: GetFriendOfCurrentUser_getFriendOfCurrentUser[];
}

export interface GetFriendOfCurrentUserVariables {
  userId: number;
  cursor?: number | null;
}
