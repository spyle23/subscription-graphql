import { GetDiscussionCurrentUser_getDiscussionCurrentUser } from "../graphql/discussion/types/GetDiscussionCurrentUser";
import { MessageToUser } from "../graphql/message";
import {
  MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup,
  MessagesOfCurrentUser_messagesOfCurrentUser_User,
} from "../graphql/message/types/MessagesOfCurrentUser";
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
  writters?: MessagesOfCurrentUser_messagesOfCurrentUser_User[];
  userDiscuss:
    | MessagesOfCurrentUser_messagesOfCurrentUser_User
    | MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup;
} & GetDiscussionCurrentUser_getDiscussionCurrentUser;
