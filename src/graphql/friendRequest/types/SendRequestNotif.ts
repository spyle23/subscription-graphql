/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequestStatus } from "./../../../types/graphql-types";

// ====================================================
// GraphQL subscription operation: SendRequestNotif
// ====================================================

export interface SendRequestNotif_sendRequestNotif_User {
  __typename: "User";
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
  id: number;
}

export interface SendRequestNotif_sendRequestNotif {
  __typename: "FriendRequestExtend";
  id: number;
  status: RequestStatus;
  updatedAt: any;
  createdAt: any;
  User: SendRequestNotif_sendRequestNotif_User;
}

export interface SendRequestNotif {
  sendRequestNotif: SendRequestNotif_sendRequestNotif;
}

export interface SendRequestNotifVariables {
  userId: number;
}
