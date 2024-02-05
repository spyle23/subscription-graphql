import { Grid } from "@mui/material";
import { FC } from "react";
import { UserInfo } from "./components/UserInfo";
import { ProfileInfoSkeleton } from "../../components/skeleton/ProfileInfoSkeleton";
import { FriendSkeleton } from "../../components/skeleton/FriendSkeleton";
import { UserFriends } from "./components/UserFriends";
import { ContainerPost } from "./components/ContainerPost";
import { Profile_profile, login_login_data } from "../../graphql/user";

type UserAboutProps = {
  loading: boolean;
  userInfo?: Profile_profile;
  user?: login_login_data;
};

export const UserAbout: FC<UserAboutProps> = ({ loading, userInfo, user }) => {
  return (
    <Grid container>
      <Grid item xs={12} md={5} sx={{ p: 1 }}>
        {loading ? (
          <ProfileInfoSkeleton />
        ) : (
          <UserInfo userInfo={userInfo?.user} />
        )}
        {loading ? (
          <FriendSkeleton />
        ) : (
          <UserFriends friends={userInfo?.friends} user={user} sx={{ my: 1 }} />
        )}
      </Grid>
      <Grid item xs={12} md={7} sx={{ p: 1 }}>
        <ContainerPost />
      </Grid>
    </Grid>
  );
};
