/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetNotifications
// ====================================================

export interface GetNotifications_getNotifications {
  __typename: "Notification";
  id: number;
  name: string;
  description: string;
  updatedAt: any;
  createdAt: any;
}

export interface GetNotifications {
  getNotifications: GetNotifications_getNotifications[];
}

export interface GetNotificationsVariables {
  userId: number;
  cursor?: number | null;
}
