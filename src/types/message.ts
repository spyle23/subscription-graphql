import {
  GetDiscussionCurrentUser_getDiscussionCurrentUser,
  GetDiscussionCurrentUser_getDiscussionCurrentUser_DiscussGroup,
  GetDiscussionCurrentUser_getDiscussionCurrentUser_User,
} from "../graphql/discussion/types/GetDiscussionCurrentUser";
import { MessageToUser } from "../graphql/message";
import { WriteMessage_writeMessage } from "../graphql/message/types/WriteMessage";

export type MessageContexteType = {
  currentDiscussion: MessageGlobalApp | undefined;
  setCurrentDiscussion: React.Dispatch<
    React.SetStateAction<MessageGlobalApp | undefined>
  >;
};

export type DiscussionContexteType = {
  discussion: MessageGlobalApp[];
  dispatchDiscussion: React.Dispatch<ActionMessageType>;
};

export type ActionMessageType = {
  type: string;
  value: MessageGlobalApp;
  theme?: string;
  data?: MessageToUser;
  writters?: WriteMessage_writeMessage;
  trigger?: boolean;
};

export type MessageGlobalApp = {
  openMessage: boolean;
  newMessageNbr: number;
  writters?: GetDiscussionCurrentUser_getDiscussionCurrentUser_User[];
  userDiscuss:
    | GetDiscussionCurrentUser_getDiscussionCurrentUser_User
    | GetDiscussionCurrentUser_getDiscussionCurrentUser_DiscussGroup;
} & GetDiscussionCurrentUser_getDiscussionCurrentUser;
