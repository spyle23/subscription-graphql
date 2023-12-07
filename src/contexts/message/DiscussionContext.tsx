import { createContext, useReducer, Reducer, FC, useMemo } from "react";
import {
  ActionMessageType,
  DiscussionContexteType,
  MessageGlobalApp,
} from "../../types/message";

const initialState: MessageGlobalApp[] = [];

const reducerMessageGlobal = (
  state: MessageGlobalApp[],
  action: ActionMessageType
) => {
  switch (action.type) {
    case "add discussion":
      if (
        !state.find((item) =>
          action.value.discussGroupId
            ? item.discussGroupId === action.value.discussGroupId
            : (item.userId === action.value.userId &&
                item.receiverId === action.value.receiverId) ||
              (item.userId === action.value.receiverId &&
                item.receiverId === action.value.userId)
        )
      ) {
        return [...state, action.value];
      }
      return state.map((i) => ({ ...i, messages: action.value.messages }));

    case "delete discussion":
      if (action.value.discussGroupId) {
        return state.filter(
          (val) => val.discussGroupId !== action.value.discussGroupId
        );
      }
      return state.filter(
        (val) =>
          val.userId !== action.value.userId &&
          val.receiverId !== action.value.receiverId
      );
    case "change newMessageNbr":
      if (action.data) {
        return state.map((val) => {
          if (
            action.data?.messageToUser.discussGroupId === val.discussGroupId ||
            action.data?.messageToUser.userId === val.userId ||
            action.data?.messageToUser.userId === val.receiverId
          ) {
            return {
              ...val,
              newMessageNbr: val.newMessageNbr + 1,
            };
          }
          return val;
        });
      }
      return state;
    default:
      return state.map((val) => {
        if (
          val.userId === action.value.userId &&
          (action.value.receiverId
            ? val.receiverId === action.value.receiverId
            : val.discussGroupId === action.value.discussGroupId)
        ) {
          return {
            ...val,
            newMessageNbr: action.trigger ? 0 : val.newMessageNbr,
            openMessage: action.trigger ? action.trigger : false,
          };
        }
        return val;
      });
  }
};

export const DiscussionContext = createContext<DiscussionContexteType>(
  {} as DiscussionContexteType
);

export const DiscussionContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [discussion, dispatchDiscussion] = useReducer<
    Reducer<MessageGlobalApp[], ActionMessageType>
  >(reducerMessageGlobal, initialState);

  const memoizedContext = useMemo(
    () => ({ discussion, dispatchDiscussion }),
    [discussion, dispatchDiscussion]
  );
  return (
    <DiscussionContext.Provider value={memoizedContext}>
      {children}
    </DiscussionContext.Provider>
  );
};
