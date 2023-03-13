/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReactionInput } from "./../../../types/graphql-types";

// ====================================================
// GraphQL mutation operation: AddReaction
// ====================================================

export interface AddReaction {
  addReaction: string;
}

export interface AddReactionVariables {
  reactionType: ReactionInput;
  userId: number;
  postId: number;
}
