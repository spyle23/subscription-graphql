/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserChoose, DiscussGroupInput } from "./../../../types/graphql-types";

// ====================================================
// GraphQL mutation operation: CreateDiscussGroup
// ====================================================

export interface CreateDiscussGroup_createDiscussGroup {
  __typename: "DiscussGroup";
  id: number;
  groupName: string;
  coverPhoto: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface CreateDiscussGroup {
  createDiscussGroup: CreateDiscussGroup_createDiscussGroup;
}

export interface CreateDiscussGroupVariables {
  userChoose: UserChoose;
  data: DiscussGroupInput;
}
