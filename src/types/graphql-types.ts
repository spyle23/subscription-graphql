/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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
}

/**
 * inputs for post
 */
export interface PostInput {
  title: string;
  description: string;
  image?: string | null;
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
 * user id in the group discuss
 */
export interface UserChoose {
  membresId: number[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
