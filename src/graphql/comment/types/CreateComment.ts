/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CommentInput } from "./../../../types/graphql-types";

// ====================================================
// GraphQL mutation operation: CreateComment
// ====================================================

export interface CreateComment {
  createComment: string;
}

export interface CreateCommentVariables {
  commentInput: CommentInput;
  postId: number;
  userId: number;
}
