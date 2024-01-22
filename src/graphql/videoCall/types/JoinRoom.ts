/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: JoinRoom
// ====================================================

export interface JoinRoom_joinRoom {
  __typename: "User";
  id: number;
  status: boolean;
  lastname: string | null;
  firstname: string | null;
  photo: string | null;
}

export interface JoinRoom {
  joinRoom: JoinRoom_joinRoom;
}

export interface JoinRoomVariables {
  userId: number;
}
