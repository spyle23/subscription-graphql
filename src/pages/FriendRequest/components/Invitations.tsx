import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  GetRequest,
  GetRequestVariables,
} from "../../../graphql/friendRequest/types/GetRequest";
import { GET_REQUEST } from "../../../graphql/friendRequest/query";
import { useApplicationContext } from "../../../hooks";
import { InvitationCard } from "./InvitationCard";
import { InvitationSkeleton } from "../../../components/skeleton/InvitationSkeleton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import {
  SendRequestNotif,
  SendRequestNotifVariables,
} from "../../../graphql/friendRequest/types/SendRequestNotif";
import { REQUEST_NOTIF } from "../../../graphql/friendRequest/subscription";
import { RequestStatus } from "../../../types/graphql-types";
import {
  HandleFriendRequest,
  HandleFriendRequestVariables,
} from "../../../graphql/friendRequest/types/HandleFriendRequest";
import { HANDLE_FRIEND_REQUEST } from "../../../graphql/friendRequest/mutations";
import emptyInvitation from "../../../assets/empty_invitations.png";

export const Invitations = () => {
  const { user } = useApplicationContext();
  const { data: invits } = useSubscription<
    SendRequestNotif,
    SendRequestNotifVariables
  >(REQUEST_NOTIF, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
  });
  const apolloClient = useApolloClient();
  const { data, loading, fetchMore } = useQuery<
    GetRequest,
    GetRequestVariables
  >(GET_REQUEST, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
    notifyOnNetworkStatusChange: true,
  });
  const [exec] = useMutation<HandleFriendRequest, HandleFriendRequestVariables>(
    HANDLE_FRIEND_REQUEST
  );
  useEffect(() => {
    if (
      invits &&
      user &&
      data &&
      !data.getRequest.find((i) => i.id === invits.sendRequestNotif.id)
    ) {
      apolloClient.writeQuery<GetRequest, GetRequestVariables>({
        query: GET_REQUEST,
        data: { getRequest: [invits.sendRequestNotif, ...data.getRequest] },
        variables: { userId: user.id },
      });
    }
  }, [invits, data, user]);
  const handleRequest = async (
    status: RequestStatus,
    friendRequestId: number
  ) => {
    if (data && user) {
      await exec({ variables: { status: status, friendRequestId } });
      apolloClient.writeQuery<GetRequest, GetRequestVariables>({
        query: GET_REQUEST,
        variables: { userId: user.id },
        data: {
          getRequest: data.getRequest.filter(
            (val) => val.id !== friendRequestId
          ),
        },
      });
    }
  };
  return (
    <Box sx={{ height: "100%" }}>
      <Typography variant="h3" textAlign="center" sx={{ my: 1 }}>
        Invitations
      </Typography>
      <Grid container>
        {data?.getRequest.map((val) => (
          <Grid item xs={6} sm={4} md={3} key={val.id} sx={{ p: 1 }}>
            <InvitationCard
              user={val.User}
              actions={
                <Box>
                  <Button
                    variant="contained"
                    onClick={() =>
                      handleRequest(RequestStatus.ACCEPTED, val.id)
                    }
                  >
                    Confirmer
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "lightgrey", ml: 1 }}
                    onClick={() => handleRequest(RequestStatus.DENIED, val.id)}
                  >
                    Supprimer
                  </Button>
                </Box>
              }
            />
          </Grid>
        ))}
        {loading &&
          [1, 2, 3, 4].map((i) => (
            <Grid item xs={6} sm={4} md={3} key={i} sx={{ p: 1 }}>
              <InvitationSkeleton />
            </Grid>
          ))}
        {data?.getRequest.length === 10 && (
          <Grid
            item
            xs={12}
            onClick={() =>
              fetchMore({
                variables: {
                  cursor: data?.getRequest[data?.getRequest.length - 1].id,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return previousResult;
                  return {
                    getRequest: [
                      ...previousResult.getRequest,
                      ...fetchMoreResult.getRequest,
                    ],
                  };
                },
              })
            }
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 1,
              py: 1,
              borderRadius: "15px",
              alignItems: "center",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "lightgrey",
              },
            }}
          >
            <Typography variant="h5">Afficher plus</Typography>
            <ExpandMoreIcon />
          </Grid>
        )}
        {data && data.getRequest.length === 0 && (
          <Grid item xs={12}>
            <Typography sx={{ textAlign: "center", mb: 1 }}>
              Aucune invitation pour le moment
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                src={emptyInvitation}
                sx={{ width: "60%" }}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
