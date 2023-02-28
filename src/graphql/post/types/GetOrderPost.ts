/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

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

export interface GetOrderPost_getOrderPost {
  __typename: "PostDisplay";
  description: string;
  image: string | null;
  id: number;
  user: GetOrderPost_getOrderPost_user;
  comments: GetOrderPost_getOrderPost_comments[] | null;
}

export interface GetOrderPost {
  getOrderPost: GetOrderPost_getOrderPost[];
}
