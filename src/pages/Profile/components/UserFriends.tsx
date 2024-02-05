import { FC } from "react";
import {
  Profile_profile_friends,
  login_login_data,
} from "../../../graphql/user";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardProps,
  Grid,
  Typography,
} from "@mui/material";
import { usePhotoUrl } from "../../../hooks/application/usePhotoUrl";
import profil from "../../../assets/profil.png";
import { useNavigate } from "react-router-dom";

type UserFriendsProps = {
  friends?: Profile_profile_friends[];
  user?: login_login_data;
} & CardProps;

export const UserFriends: FC<UserFriendsProps> = ({
  friends,
  user,
  sx,
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <Card elevation={1} sx={{ p: 1, ...sx }} {...props}>
      <CardHeader
        title={
          <Typography variant="h4" textAlign="center">
            Amis
          </Typography>
        }
      />
      <CardContent>
        <Grid container>
          {friends?.map((val) => (
            <Grid item key={val.id} xs={4} sx={{ p: 1 }}>
              <Box
                onClick={() => navigate(`/landing/profil/${val.id}`)}
                sx={{
                  width: "100%",
                  height: "180px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <Box
                  component="img"
                  src={val.photo ? usePhotoUrl(val.photo) : profil}
                  sx={{
                    width: "100%",
                    height: "70%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <Typography>
                  {user?.id === val.id
                    ? "Vous"
                    : `${val.firstname} ${val.lastname}`}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
      {friends?.length === 10 && (
        <CardActions sx={{ justifyContent: "center" }}>
          <Button sx={{ width: "100%" }} onClick={() => navigate("friends")}>
            Voir tout
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
