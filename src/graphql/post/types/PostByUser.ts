/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReactionType } from "./../../../types/graphql-types";

// ====================================================
// GraphQL query operation: PostByUser
// ====================================================

export interface PostByUser_postByUser_user {
  __typename: "User";
  lastname: string | null;
  firstname: string | null;
  photo: string | null;
  id: number;
  status: boolean;
}

export interface PostByUser_postByUser_reactions {
  __typename: "Reaction";
  id: number;
  reactionType: ReactionType;
  userId: number;
}

export interface PostByUser_postByUser_files {
  __typename: "FileExt";
  id: number;
  name: string;
  url: string;
  extension: string;
}

export interface PostByUser_postByUser {
  __typename: "PostDisplay";
  id: number;
  description: string;
  createdAt: any;
  updatedAt: any;
  nbComments: number;
  user: PostByUser_postByUser_user;
  reactions: PostByUser_postByUser_reactions[] | null;
  files: PostByUser_postByUser_files[];
}

export interface PostByUser {
  postByUser: PostByUser_postByUser[];
}

export interface PostByUserVariables {
  userId: number;
  cursor?: number | null;
}
