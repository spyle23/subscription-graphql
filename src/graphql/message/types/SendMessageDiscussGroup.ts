/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MessageInput } from "./../../../types/graphql-types";

// ====================================================
// GraphQL mutation operation: SendMessageDiscussGroup
// ====================================================

export interface SendMessageDiscussGroup_sendMessageDiscoussGroup {
  __typename: "MessageResponse";
  message: string;
  success: boolean;
}

export interface SendMessageDiscussGroup {
  sendMessageDiscoussGroup: SendMessageDiscussGroup_sendMessageDiscoussGroup;
}

export interface SendMessageDiscussGroupVariables {
  userId: number;
  messageInput: MessageInput;
  receiverId?: number | null;
  discussGroupId?: number | null;
}
