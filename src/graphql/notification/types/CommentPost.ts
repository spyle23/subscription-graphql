/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: CommentPost
// ====================================================

export interface CommentPost_commentPost {
  __typename: "Notification";
  id: number;
  name: string;
  description: string;
  createdAt: any;
  updatedAt: any;
}

export interface CommentPost {
  commentPost: CommentPost_commentPost;
}

export interface CommentPostVariables {
  userId: number;
}
