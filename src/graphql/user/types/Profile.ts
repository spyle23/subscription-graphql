/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RequestStatus } from "./../../../types/graphql-types";

// ====================================================
// GraphQL query operation: Profile
// ====================================================

export interface Profile_profile_user {
  __typename: "User";
  id: number;
  email: string;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
  civilite: string | null;
  createdAt: any;
  updatedAt: any;
}

export interface Profile_profile_friends {
  __typename: "User";
  id: number;
  status: boolean;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
}

export interface Profile_profile_relation {
  __typename: "FriendRequest";
  id: number;
  status: RequestStatus;
  receiverId: number;
  userId: number;
}

export interface Profile_profile {
  __typename: "UserDetails";
  user: Profile_profile_user;
  friends: Profile_profile_friends[];
  relation: Profile_profile_relation | null;
}

export interface Profile {
  profile: Profile_profile;
}

export interface ProfileVariables {
  viewerId: number;
  profilId: number;
}
