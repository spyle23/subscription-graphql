/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CallStatus } from "./../../../types/graphql-types";

// ====================================================
// GraphQL query operation: GetVideoCall
// ====================================================

export interface GetVideoCall_getVideoCall_members {
  __typename: "User";
  id: number;
  status: boolean;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
}

export interface GetVideoCall_getVideoCall {
  __typename: "VideoCallMembers";
  id: number;
  status: CallStatus;
  createdAt: any;
  updatedAt: any;
  members: GetVideoCall_getVideoCall_members[];
}

export interface GetVideoCall {
  getVideoCall: GetVideoCall_getVideoCall;
}

export interface GetVideoCallVariables {
  token: string;
  userId: number;
}
