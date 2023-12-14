/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDiscussion
// ====================================================

export interface CreateDiscussion_createDiscussion {
  __typename: "Discussion";
  theme: string;
  updatedAt: any;
  createdAt: any;
  id: number;
  receiverId: number | null;
  userId: number;
}

export interface CreateDiscussion {
  createDiscussion: CreateDiscussion_createDiscussion;
}

export interface CreateDiscussionVariables {
  receiverId: number;
  userId: number;
}
