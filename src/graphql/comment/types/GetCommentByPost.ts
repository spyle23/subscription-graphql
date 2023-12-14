/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCommentByPost
// ====================================================

export interface GetCommentByPost_getCommentByPost_data_User {
  __typename: "User";
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
  id: number;
}

export interface GetCommentByPost_getCommentByPost_data_files {
  __typename: "FileExt";
  name: string;
  extension: string;
  url: string;
}

export interface GetCommentByPost_getCommentByPost_data {
  __typename: "CommentWithUser";
  id: number;
  content: string;
  User: GetCommentByPost_getCommentByPost_data_User;
  files: GetCommentByPost_getCommentByPost_data_files[];
  updatedAt: any;
  createdAt: any;
}

export interface GetCommentByPost_getCommentByPost {
  __typename: "CommentResponse";
  success: boolean;
  message: string;
  data: GetCommentByPost_getCommentByPost_data[] | null;
}

export interface GetCommentByPost {
  getCommentByPost: GetCommentByPost_getCommentByPost;
}

export interface GetCommentByPostVariables {
  postId: number;
  cursor?: number | null;
}
