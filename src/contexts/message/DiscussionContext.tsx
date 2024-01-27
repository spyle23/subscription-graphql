import {
  createContext,
  useReducer,
  Reducer,
  FC,
  useMemo,
  useState,
  useEffect,
} from "react";
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
              theme:
                i.theme !== action.value.theme ? action.value.theme : i.theme,
              messages: action.value.messages,
              openMessage: action.value.openMessage,
              newMessageNbr:
                i.theme !== action.value.theme
                  ? 0
                  : action.data
                  ? i.newMessageNbr + 1
                  : i.newMessageNbr,
            }
          : i
      );

    case "delete discussion":
      return state.filter((val) => val.id !== action.value.id);
    case "change Theme":
      return state.map((i) =>
        i.id === action.value.id && action.theme
          ? { ...i, theme: action.theme }
          : i
      );
    case "add Writters":
      return state.map((i) =>
        i.id === action.writters?.discussionId &&
        !i.writters?.find((a) => a.id === action.writters?.user.id)
          ? {
              ...i,
              writters: i.writters
                ? [...i.writters, action.writters.user]
                : [action.writters.user],
            }
          : i
      );
    case "delete Writters":
      return state.map((i) =>
        i.id === action.writters?.discussionId
          ? {
              ...i,
              writters: i.writters?.filter(
                (a) => a.id !== action.writters?.user.id
              ),
            }
          : i
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
