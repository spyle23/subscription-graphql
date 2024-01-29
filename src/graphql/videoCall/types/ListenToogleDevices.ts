/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: ListenToogleDevices
// ====================================================

export interface ListenToogleDevices_listenToogleDevices {
  __typename: "IDevice";
  userId: number;
  audio: boolean;
  video: boolean;
}

export interface ListenToogleDevices {
  listenToogleDevices: ListenToogleDevices_listenToogleDevices;
}

export interface ListenToogleDevicesVariables {
  userId: number;
}
