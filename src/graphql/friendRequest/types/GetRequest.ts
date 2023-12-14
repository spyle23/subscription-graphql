/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequestStatus } from "./../../../types/graphql-types";

// ====================================================
// GraphQL query operation: GetRequest
// ====================================================

export interface GetRequest_getRequest_User {
  __typename: "User";
  firstname: string | null;
  lastname: string | null;
  id: number;
  photo: string | null;
}

export interface GetRequest_getRequest {
  __typename: "FriendRequestExtend";
  status: RequestStatus;
  createdAt: any;
  updatedAt: any;
  id: number;
  User: GetRequest_getRequest_User;
}

export interface GetRequest {
  getRequest: GetRequest_getRequest[];
}

export interface GetRequestVariables {
  userId: number;
  cursor?: number | null;
}
