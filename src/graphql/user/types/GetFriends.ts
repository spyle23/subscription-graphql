/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFriends
// ====================================================

export interface GetFriends_getFriends {
  __typename: "User";
  lastname: string | null;
  photo: string | null;
  firstname: string | null;
  id: number;
}

export interface GetFriends {
  getFriends: GetFriends_getFriends[];
}

export interface GetFriendsVariables {
  userId: number;
  cursor?: number | null;
}
