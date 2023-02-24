/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostByUser
// ====================================================

export interface PostByUser_postByUser {
  __typename: "Post";
  id: number;
  userId: number;
  description: string;
  image: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface PostByUser {
  postByUser: PostByUser_postByUser[];
}

export interface PostByUserVariables {
  userId: number;
}
