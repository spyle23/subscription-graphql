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
      return [...state, action.value];

    case "delete discussion":
      return state.filter(
        (val) =>
          val.userId === action.value.userId &&
          (action.value.receiverId
            ? val.receiverId !== action.value.receiverId
            : val.discussGroupId !== action.value.discussGroupId)
      );
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
