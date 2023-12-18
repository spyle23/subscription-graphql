/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReactionType } from "./../../../types/graphql-types";

// ====================================================
// GraphQL query operation: PostByUser
// ====================================================

export interface PostByUser_postByUser_reactions {
  __typename: "Reaction";
  reactionType: ReactionType;
  userId: number;
  id: number;
}

export interface PostByUser_postByUser_files {
  __typename: "FileExt";
  name: string;
  extension: string;
  id: number;
  url: string;
}

export interface PostByUser_postByUser {
  __typename: "PostDisplay";
  reactions: PostByUser_postByUser_reactions[] | null;
  files: PostByUser_postByUser_files[];
  description: string;
  createdAt: any;
  updatedAt: any;
  id: number;
}

export interface PostByUser {
  postByUser: PostByUser_postByUser[];
}

export interface PostByUserVariables {
  userId: number;
}
