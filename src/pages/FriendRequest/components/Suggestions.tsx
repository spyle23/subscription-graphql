import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Box, Button, Grid, Typography } from "@mui/material";
import {
  GetSuggestionOfCurrentUser,
  GetSuggestionOfCurrentUserVariables,
} from "../../../graphql/friendRequest/types/GetSuggestionOfCurrentUser";
import { GET_SUGGESTION } from "../../../graphql/friendRequest/query";
import { useApplicationContext } from "../../../hooks";
import { InvitationCard } from "./InvitationCard";
import { InvitationSkeleton } from "../../../components/skeleton/InvitationSkeleton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  SendFriendRequest,
  SendFriendRequestVariables,
} from "../../../graphql/friendRequest/types/SendFriendRequest";
import { SEND_FRIEND_REQUEST } from "../../../graphql/friendRequest/mutations";

export const Suggestions = () => {
  const { user } = useApplicationContext();
  const { data, loading, fetchMore } = useQuery<
    GetSuggestionOfCurrentUser,
    GetSuggestionOfCurrentUserVariables
  >(GET_SUGGESTION, {
    variables: { userId: user?.id as number },
    skip: !user?.id,
    notifyOnNetworkStatusChange: true,
  });
  const apolloClient = useApolloClient();
  const [exec] = useMutation<SendFriendRequest, SendFriendRequestVariables>(
    SEND_FRIEND_REQUEST
  );
  const sendRequest = async (receiverId: number) => {
    if (user && data) {
      await exec({ variables: { userId: user.id, receiverId } });
      apolloClient.writeQuery<
        GetSuggestionOfCurrentUser,
        GetSuggestionOfCurrentUserVariables
      >({
        query: GET_SUGGESTION,
        variables: { userId: user.id },
        data: {
          getSuggestionOfCurrentUser: data.getSuggestionOfCurrentUser.filter(
            (i) => i.id !== receiverId
          ),
        },
      });
    }
  };
  return (
    <Box>
      <Typography variant="h3" textAlign="center" sx={{ my: 1 }}>
        Suggestions
      </Typography>
      <Grid container>
        {data?.getSuggestionOfCurrentUser.map((val) => (
          <Grid item xs={12} sm={4} md={3} key={val.id} sx={{ p: 1 }}>
            <InvitationCard
              user={val}
              actions={
                <Button variant="contained" onClick={() => sendRequest(val.id)}>
                  Ajouter
                </Button>
              }
            />
          </Grid>
        ))}
        {loading &&
          [1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={4} md={3} key={i} sx={{ p: 1 }}>
              <InvitationSkeleton />
            </Grid>
          ))}
        {data?.getSuggestionOfCurrentUser.length === 10 && (
          <Grid
            item
            xs={12}
            onClick={() =>
              fetchMore({
                variables: {
                  cursor:
                    data.getSuggestionOfCurrentUser[
                      data?.getSuggestionOfCurrentUser.length - 1
                    ].id,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return previousResult;
                  return {
                    getSuggestionOfCurrentUser: [
                      ...previousResult.getSuggestionOfCurrentUser,
                      ...fetchMoreResult.getSuggestionOfCurrentUser,
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
      </Grid>
    </Box>
  );
};
