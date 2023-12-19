import { GetDiscussionCurrentUser_getDiscussionCurrentUser } from "../graphql/discussion/types/GetDiscussionCurrentUser";
import { MessageToUser } from "../graphql/message";
import {
  MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup,
  MessagesOfCurrentUser_messagesOfCurrentUser_User,
} from "../graphql/message/types/MessagesOfCurrentUser";

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
  data?: MessageToUser;
  trigger?: boolean;
};

export type MessageGlobalApp = {
  openMessage: boolean;
  newMessageNbr: number;
  userDiscuss:
    | MessagesOfCurrentUser_messagesOfCurrentUser_User
    | MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup;
} & GetDiscussionCurrentUser_getDiscussionCurrentUser;
