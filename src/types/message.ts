import { MessageToUser_messageToUser } from "../graphql/message";
import {
  MessagesOfCurrentUser_messagesOfCurrentUser,
  MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup,
  MessagesOfCurrentUser_messagesOfCurrentUser_Receiver,
  MessagesOfCurrentUser_messagesOfCurrentUser_User,
} from "../graphql/message/types/MessagesOfCurrentUser";

export type MessageActionType = {
  openMessage: boolean;
  userDiscuss?:
    | MessagesOfCurrentUser_messagesOfCurrentUser_User
    | MessagesOfCurrentUser_messagesOfCurrentUser_Receiver
    | null;
  receiverId?: number;
  userId?: number;
  discussGroupId?: number;
  DiscussGroup?: MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup | null;
};

export type MessageContexteType = {
  currentMessage: MessageActionType;
  dispatch: React.Dispatch<ActionType>;
};

export type ActionType = {
  type: string;
  value:
    | MessagesOfCurrentUser_messagesOfCurrentUser
    | MessageToUser_messageToUser;
  userDiscuss:
    | MessagesOfCurrentUser_messagesOfCurrentUser_User
    | MessagesOfCurrentUser_messagesOfCurrentUser_Receiver
    | null;
};
