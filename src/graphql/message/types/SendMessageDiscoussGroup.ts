/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MessageInput } from "./../../../types/graphql-types";

// ====================================================
// GraphQL mutation operation: SendMessageDiscoussGroup
// ====================================================

export interface SendMessageDiscoussGroup_sendMessageDiscoussGroup {
  __typename: "MessageResponse";
  success: boolean;
  message: string;
}

export interface SendMessageDiscoussGroup {
  sendMessageDiscoussGroup: SendMessageDiscoussGroup_sendMessageDiscoussGroup;
}

export interface SendMessageDiscoussGroupVariables {
  discussionId: number;
  userId: number;
  messageInput: MessageInput;
  receiverId?: number | null;
  discussGroupId?: number | null;
}
