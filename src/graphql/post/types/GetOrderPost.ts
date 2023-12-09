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
  firstname: string | null;
  lastname: string | null;
  id: number;
  photo: string | null;
}

export interface GetOrderPost_getOrderPost_comments {
  __typename: "Comment";
  content: string;
  image: string | null;
  id: number;
}

export interface GetOrderPost_getOrderPost_reactions {
  __typename: "Reaction";
  reactionType: ReactionType;
  userId: number;
}

export interface GetOrderPost_getOrderPost {
  __typename: "PostDisplay";
  description: string;
  image: string | null;
  id: number;
  user: GetOrderPost_getOrderPost_user;
  comments: GetOrderPost_getOrderPost_comments[] | null;
  reactions: GetOrderPost_getOrderPost_reactions[] | null;
  createdAt: any;
  updatedAt: any;
}

export interface GetOrderPost {
  getOrderPost: GetOrderPost_getOrderPost[];
}

export interface GetOrderPostVariables {
  cursor?: number | null;
}
