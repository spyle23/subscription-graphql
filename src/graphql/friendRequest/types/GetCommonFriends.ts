/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCommonFriends
// ====================================================

export interface GetCommonFriends_getCommonFriends {
  __typename: "User";
  firstname: string | null;
  lastname: string | null;
  id: number;
  photo: string | null;
}

export interface GetCommonFriends {
  getCommonFriends: GetCommonFriends_getCommonFriends[];
}

export interface GetCommonFriendsVariables {
  receiverId: number;
  userId: number;
  cursor?: number | null;
}
