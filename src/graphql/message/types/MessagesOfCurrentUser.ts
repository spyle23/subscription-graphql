/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MessagesOfCurrentUser
// ====================================================

export interface MessagesOfCurrentUser_messagesOfCurrentUser_User {
  __typename: "User";
  id: number;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
}

export interface MessagesOfCurrentUser_messagesOfCurrentUser_Receiver {
  __typename: "User";
  id: number;
  firstname: string | null;
  lastname: string | null;
  photo: string | null;
}

export interface MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup {
  __typename: "DiscussGroup";
  id: number;
  groupName: string;
  coverPhoto: string | null;
}

export interface MessagesOfCurrentUser_messagesOfCurrentUser {
  __typename: "MessageWithRecepter";
  User: MessagesOfCurrentUser_messagesOfCurrentUser_User;
  Receiver: MessagesOfCurrentUser_messagesOfCurrentUser_Receiver | null;
  DiscussGroup: MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup | null;
  image: string | null;
  content: string;
  id: number;
}

export interface MessagesOfCurrentUser {
  messagesOfCurrentUser: MessagesOfCurrentUser_messagesOfCurrentUser[];
}

export interface MessagesOfCurrentUserVariables {
  userId: number;
}
