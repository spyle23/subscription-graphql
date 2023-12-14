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
  groupName: string;
  coverPhoto: string | null;
  id: number;
}

export interface CreateDiscussGroup {
  createDiscussGroup: CreateDiscussGroup_createDiscussGroup;
}

export interface CreateDiscussGroupVariables {
  userId: number;
  userChoose: UserChoose;
  data: DiscussGroupInput;
}
