/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ReactionType {
  GRR = "GRR",
  HAHA = "HAHA",
  LIKE = "LIKE",
  LOVE = "LOVE",
  WOAHOU = "WOAHOU",
}

/**
 * input for the comment
 */
export interface CommentInput {
  content: string;
  image?: string | null;
}

/**
 * user choose
 */
export interface DiscussGroupInput {
  groupName: string;
  coverPhoto?: string | null;
}

/**
 * messgae inputs
 */
export interface MessageInput {
  content: string;
  image: string;
}

/**
 * inputs for post
 */
export interface PostInput {
  description: string;
  image?: string | null;
}

/**
 * input of the reaction
 */
export interface ReactionInput {
  reactionType: ReactionType;
}

/**
 * user inputs
 */
export interface SignupInput {
  email: string;
  firstname?: string | null;
  lastname?: string | null;
  password: string;
  civilite?: string | null;
}

/**
 * input for update user
 */
export interface UpdateUserInput {
  email: string;
  firstname?: string | null;
  lastname?: string | null;
  password: string;
  civilite?: string | null;
  photo?: string | null;
}

/**
 * input for the file
 */
export interface UploadInput {
  name: string;
  data: string;
  type: string;
}

/**
 * user id in the group discuss
 */
export interface UserChoose {
  membresId: number[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
