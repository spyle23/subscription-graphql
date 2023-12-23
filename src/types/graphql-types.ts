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
  SAD = "SAD",
  WOAHOU = "WOAHOU",
}

export enum RequestStatus {
  ACCEPTED = "ACCEPTED",
  DENIED = "DENIED",
  PENDING = "PENDING",
}

/**
 * input for the comment
 */
export interface CommentInput {
  content: string;
  files: FileInput[];
}

/**
 * user choose
 */
export interface DiscussGroupInput {
  groupName: string;
  coverPhoto?: string | null;
}

/**
 * input for changing theme discussion
 */
export interface DiscussionInput {
  id: number;
  userId: number;
  receiverId?: number | null;
  theme: string;
}

/**
 * input for file
 */
export interface FileInput {
  name: string;
  extension: string;
  url: string;
}

/**
 * message inputs
 */
export interface MessageInput {
  content: string;
  files: FileInput[];
}

/**
 * inputs for post
 */
export interface PostInput {
  description: string;
  files: FileInput[];
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
  email?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  civilite?: string | null;
  photo?: string | null;
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
