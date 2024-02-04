import { Box, BoxProps } from "@mui/material";
import React, { FC, Fragment, useEffect } from "react";
import { useApplicationContext } from "../../../hooks";
import { PresenterMessage } from "./PresenterMessage";
import {
  GetDiscussionCurrentUser,
  GetDiscussionCurrentUserVariables,
  GetDiscussionCurrentUser_getDiscussionCurrentUser,
} from "../../../graphql/discussion/types/GetDiscussionCurrentUser";
import { MessageGlobalApp } from "../../../types/message";
import { Waypoint } from "react-waypoint";
import {
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
} from "@apollo/client";
import { MessageSkeleton } from "../../../components/skeleton/MessageSkeleton";

type ContainerMessageProps = {
  discussions: MessageGlobalApp[];
  loading: boolean;
  fetchMore: <
    TFetchData = GetDiscussionCurrentUser,
    TFetchVars extends OperationVariables = GetDiscussionCurrentUserVariables
  >(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
      updateQuery?: (
        previousQueryResult: GetDiscussionCurrentUser,
        options: {
          fetchMoreResult: TFetchData;
          variables: TFetchVars;
        }
      ) => GetDiscussionCurrentUser;
    }
  ) => Promise<ApolloQueryResult<TFetchData>>;
  selectDiscussion: (
    data: GetDiscussionCurrentUser_getDiscussionCurrentUser
  ) => void;
  onClose?: () => void;
} & BoxProps;

export const ContainerMessage: FC<ContainerMessageProps> = React.memo(
  ({
    discussions,
    loading,
    fetchMore,
    selectDiscussion,
    onClose,
    sx,
    ...props
  }) => {
    const { user } = useApplicationContext();

    const handleClickMessage = (
      value: GetDiscussionCurrentUser_getDiscussionCurrentUser
    ) => {
      selectDiscussion(value);
      onClose && onClose();
    };

    return (
      <Box sx={{ height: "450px ", overflowY: "auto", p: 1, ...sx }} {...props}>
        {discussions.map((value, index) => (
          <Fragment key={value.id}>
            <PresenterMessage
              key={value.id}
              discussion={value}
              user={user}
              onClick={() => handleClickMessage(value)}
            />
            {index === discussions.length - 1 && discussions.length === 10 && (
              <Waypoint
                onEnter={() =>
                  fetchMore({
                    variables: {
                      cursor: discussions[discussions.length - 1].id,
                    },
                    updateQuery(previousQueryResult, { fetchMoreResult }) {
                      if (!fetchMoreResult) return previousQueryResult;
                      return {
                        getDiscussionCurrentUser: [
                          ...previousQueryResult.getDiscussionCurrentUser,
                          ...fetchMoreResult.getDiscussionCurrentUser,
                        ],
                      };
                    },
                  })
                }
              />
            )}
          </Fragment>
        ))}
        {loading && [1, 2, 3].map((val) => <MessageSkeleton key={val} />)}
      </Box>
    );
  }
);
