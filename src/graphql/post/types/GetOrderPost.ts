/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReactionType } from "./../../../types/graphql-types";

// ====================================================
// GraphQL query operation: GetOrderPost
// ====================================================

export interface GetOrderPost_getOrderPost_user {
  __typename: "User";
  lastname: string | null;
  firstname: string | null;
  photo: string | null;
  id: number;
  status: boolean;
}

export interface GetOrderPost_getOrderPost_reactions {
  __typename: "Reaction";
  reactionType: ReactionType;
  userId: number;
}

export interface GetOrderPost_getOrderPost_files {
  __typename: "FileExt";
  name: string;
  extension: string;
  id: number;
  url: string;
}

export interface GetOrderPost_getOrderPost {
  __typename: "PostDisplay";
  user: GetOrderPost_getOrderPost_user;
  reactions: GetOrderPost_getOrderPost_reactions[] | null;
  nbComments: number;
  description: string;
  id: number;
  files: GetOrderPost_getOrderPost_files[];
  createdAt: any;
  updatedAt: any;
}

export interface GetOrderPost {
  getOrderPost: GetOrderPost_getOrderPost[];
}

export interface GetOrderPostVariables {
  cursor?: number | null;
}
