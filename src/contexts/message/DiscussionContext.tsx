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
      if (!state.find((item) => action.value.id === item.id)) {
        return [...state, action.value];
      }
      return state.map((i) =>
        i.id === action.value.id
          ? {
              ...i,
              messages: action.value.messages,
              newMessageNbr: i.newMessageNbr + 1,
            }
          : i
      );

    case "delete discussion":
      return state.filter((val) => val.id !== action.value.id);
    case "change Theme":
      return state.map((i) =>
        i.id === action.value.id ? { ...i, theme: action.value.theme } : i
      );
    default:
      return state.map((val) => {
        if (val.id === action.value.id) {
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
