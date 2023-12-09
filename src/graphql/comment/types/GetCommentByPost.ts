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
}

export interface GetCommentByPost_getCommentByPost_data {
  __typename: "CommentWithUser";
  image: string | null;
  content: string;
  id: number;
  User: GetCommentByPost_getCommentByPost_data_User;
  createdAt: any;
  updatedAt: any;
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
