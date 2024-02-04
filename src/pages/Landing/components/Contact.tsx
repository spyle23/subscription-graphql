import { Box, Card, Typography } from "@mui/material";
import React, { FC, useContext, useEffect, useState } from "react";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import {
  GetStatusUser,
  GetStatusUser_getStatusUser,
} from "../../../graphql/user/types/GetStatusUser";
import { DiscussionContext } from "../../../contexts/message";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  CreateDiscussion,
  CreateDiscussionVariables,
} from "../../../graphql/discussion/types/CreateDiscussion";
import { CREATE_DISCUSSION } from "../../../graphql/discussion";
import { login_login_data } from "../../../graphql/user";
import { determineUserOrGroup } from "../../Message/components/PresenterMessage";
import {
  GetFriendOfCurrentUser,
  GetFriendOfCurrentUserVariables,
} from "../../../graphql/friendRequest/types/GetFriendOfCurrentUser";
import { GET_FRIEND } from "../../../graphql/friendRequest/query";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ContactSkeleton } from "../../../components/skeleton/MessageSkeleton";
type ContactProps = {
  data?: GetStatusUser;
  user?: login_login_data;
};

export const Contact: FC<ContactProps> = React.memo(({ data, user }) => {
  const [cursor, setCursor] = useState<number | null>(null);
  const {
    data: friends,
    loading,
    fetchMore,
  } = useQuery<GetFriendOfCurrentUser, GetFriendOfCurrentUserVariables>(
    GET_FRIEND,
    {
      variables: { userId: user?.id as number, status: true, cursor: null },
      skip: !user?.id,
      notifyOnNetworkStatusChange: true,
    }
  );
  const apolloClient = useApolloClient();
  const { dispatchDiscussion } = useContext(DiscussionContext);
  const [exec] = useMutation<CreateDiscussion, CreateDiscussionVariables>(
    CREATE_DISCUSSION
  );

  useEffect(() => {
    if (
      data &&
      friends &&
      user &&
      !friends.getFriendOfCurrentUser.find(
        (i) =>
          i.id === data.getStatusUser.id &&
          i.status === data.getStatusUser.status
      )
    ) {
      apolloClient.writeQuery<
        GetFriendOfCurrentUser,
        GetFriendOfCurrentUserVariables
      >({
        query: GET_FRIEND,
        variables: { userId: user.id, status: true, cursor: cursor },
        data: {
          getFriendOfCurrentUser: data.getStatusUser.status
            ? [data.getStatusUser, ...friends.getFriendOfCurrentUser]
            : friends.getFriendOfCurrentUser.filter(
                (i) => i.id !== data.getStatusUser.id
              ),
        },
      });
    }
  }, [data, user, friends, cursor]);
  const handleSelect = async (val: GetStatusUser_getStatusUser) => {
    if (!user) return;
    const { data } = await exec({
      variables: { userId: user.id, receiverId: val.id },
    });
    if (data) {
      dispatchDiscussion({
        type: "add discussion",
        value: {
          ...data.createDiscussion,
          openMessage: true,
          newMessageNbr: 0,
          userDiscuss: determineUserOrGroup(
            user,
            { ...data.createDiscussion.User, status: true },
            data.createDiscussion.Receiver
              ? { ...data.createDiscussion.Receiver, status: true }
              : null,
            data.createDiscussion.DiscussGroup
          ),
        },
      });
    }
  };
  return (
    <Card
      elevation={1}
      sx={{
        position: "fixed",
        right: "10px",
        display: { xs: "none", md: "block" },
        width: "25vw",
        bottom: "10px",
        p: 1,
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", my: 1 }}>
        Contacts
      </Typography>
      <Box sx={{ height: "78vh", overflowY: "auto" }}>
        {friends?.getFriendOfCurrentUser
          .filter((i) => i.status)
          .map((val) => (
            <Box
              key={val.id}
              onClick={() => handleSelect(val)}
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                borderRadius: "10px",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "lightgray",
                },
              }}
            >
              <DynamicAvatar user={val} />
              <Typography>{val.firstname + " " + val.lastname}</Typography>
            </Box>
          ))}
        {friends &&
          friends.getFriendOfCurrentUser.length > 0 &&
          friends.getFriendOfCurrentUser.length % 10 === 0 && (
            <Box
              onClick={() => {
                setCursor(
                  friends.getFriendOfCurrentUser[
                    friends.getFriendOfCurrentUser.length - 1
                  ].id
                );
                fetchMore({
                  variables: {
                    userId: user?.id as number,
                    status: true,
                    cursor:
                      friends.getFriendOfCurrentUser[
                        friends.getFriendOfCurrentUser.length - 1
                      ].id,
                  },
                  updateQuery: (previousQueryResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return previousQueryResult;
                    return {
                      getFriendOfCurrentUser: [
                        ...previousQueryResult.getFriendOfCurrentUser,
                        ...fetchMoreResult.getFriendOfCurrentUser,
                      ],
                    };
                  },
                });
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "lightgray",
                },
                py: 1,
              }}
            >
              <Typography>Afficher plus</Typography>
              <ExpandMoreIcon />
            </Box>
          )}
        {loading && [1, 2, 3].map((val) => <ContactSkeleton key={val} />)}
      </Box>
    </Card>
  );
});
