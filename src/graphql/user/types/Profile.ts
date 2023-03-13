/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Profile
// ====================================================

export interface Profile_profile_Post {
  __typename: "Post";
  description: string;
  image: string | null;
}

export interface Profile_profile_notifications {
  __typename: "Notification";
  name: string;
  description: string;
  createdAt: any;
  updatedAt: any;
}

export interface Profile_profile {
  __typename: "UserDetails";
  id: number;
  email: string;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
  civilite: string | null;
  Post: Profile_profile_Post[];
  notifications: Profile_profile_notifications[];
}

export interface Profile {
  profile: Profile_profile | null;
}

export interface ProfileVariables {
  userId: number;
}
