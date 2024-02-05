import { FC } from "react";
import { login_login_data } from "../../graphql/user";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import {
  GET_COMMON_FRIEND,
  GET_FRIEND,
} from "../../graphql/friendRequest/query";
import {
  GetCommonFriends,
  GetCommonFriendsVariables,
} from "../../graphql/friendRequest/types/GetCommonFriends";
import { InvitationCard } from "../FriendRequest/components/InvitationCard";
import {
  GetFriendOfCurrentUser,
  GetFriendOfCurrentUserVariables,
} from "../../graphql/friendRequest/types/GetFriendOfCurrentUser";
import { InvitationSkeleton } from "../../components/skeleton/InvitationSkeleton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import empty_friends from "../../assets/empty_friends.png";

type ProfilFriendsProps = {
  profilId?: number;
  user?: login_login_data;
};

export const ProfilFriends: FC<ProfilFriendsProps> = ({ profilId, user }) => {
  const navigate = useNavigate();
  const {
    data: commonFriends,
    loading: commonLoading,
    fetchMore: commonFetchMore,
  } = useQuery<GetCommonFriends, GetCommonFriendsVariables>(GET_COMMON_FRIEND, {
    variables: { userId: profilId as number, receiverId: user?.id as number },
    skip: !profilId || !user?.id,
    notifyOnNetworkStatusChange: true,
  });
  const {
    data: friends,
    loading: friendsLoading,
    fetchMore: friendFetchMore,
  } = useQuery<GetFriendOfCurrentUser, GetFriendOfCurrentUserVariables>(
    GET_FRIEND,
    {
      variables: { userId: profilId as number },
      skip: !profilId,
      notifyOnNetworkStatusChange: true,
    }
  );
  return (
    <Box>
      {profilId !== user?.id &&
        commonFriends &&
        commonFriends.getCommonFriends.length > 0 && (
          <Box>
            <Typography variant="h4" sx={{ my: 1 }}>
              Amis en commun
            </Typography>
            <Grid container>
              {commonFriends?.getCommonFriends.map((val) => (
                <Grid item key={val.id} xs={3} sx={{ p: 1 }}>
                  <InvitationCard
                    user={val}
                    actions={
                      <Button
                        onClick={() => navigate(`/landing/profil/${val.id}`)}
                        variant="outlined"
                        sx={{ width: "100%" }}
                      >
                        Voir profil
                      </Button>
                    }
                  />
                </Grid>
              ))}
              {commonLoading &&
                [1, 2, 3, 4].map((i) => (
                  <Grid item xs={12} sm={4} md={3} key={i} sx={{ p: 1 }}>
                    <InvitationSkeleton />
                  </Grid>
                ))}
              {commonFriends?.getCommonFriends.length === 10 && (
                <Grid
                  item
                  xs={12}
                  onClick={() =>
                    commonFetchMore({
                      variables: {
                        cursor:
                          commonFriends?.getCommonFriends[
                            commonFriends.getCommonFriends.length - 1
                          ].id,
                      },
                      updateQuery: (previousResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return previousResult;
                        return {
                          getCommonFriends: [
                            ...previousResult.getCommonFriends,
                            ...fetchMoreResult.getCommonFriends,
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
        )}
      <Box sx={{ my: 1 }}>
        <Typography variant="h4" sx={{ my: 1 }}>
          Tous les amis
        </Typography>
        <Grid container>
          {friends?.getFriendOfCurrentUser.length === 0 && (
            <Box>
              <Typography sx={{ textAlign: "center" }}>
                La liste d'amis est vide
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  component="img"
                  src={empty_friends}
                  sx={{ width: "200px" }}
                />
              </Box>
            </Box>
          )}
          {friends?.getFriendOfCurrentUser.map((val) => (
            <Grid item key={val.id} xs={3} sx={{ p: 1 }}>
              <InvitationCard
                user={val}
                actions={
                  <Button
                    onClick={() => navigate(`/landing/profil/${val.id}`)}
                    variant="outlined"
                    sx={{ width: "100%" }}
                  >
                    Voir profil
                  </Button>
                }
              />
            </Grid>
          ))}
          {friendsLoading &&
            [1, 2, 3, 4].map((i) => (
              <Grid item xs={12} sm={4} md={3} key={i} sx={{ p: 1 }}>
                <InvitationSkeleton />
              </Grid>
            ))}
          {friends?.getFriendOfCurrentUser.length === 10 && (
            <Grid
              item
              xs={12}
              onClick={() =>
                friendFetchMore({
                  variables: {
                    cursor:
                      friends?.getFriendOfCurrentUser[
                        friends.getFriendOfCurrentUser.length - 1
                      ].id,
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return previousResult;
                    return {
                      getFriendOfCurrentUser: [
                        ...previousResult.getFriendOfCurrentUser,
                        ...fetchMoreResult.getFriendOfCurrentUser,
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
    </Box>
  );
};
