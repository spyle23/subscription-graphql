import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardProps,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { GetRequest_getRequest_User } from "../../../graphql/friendRequest/types/GetRequest";
import { usePhotoUrl } from "../../../hooks/application/usePhotoUrl";
import defaultProfil from "../../../assets/profil.png";
import { useNavigate } from "react-router-dom";

type InvitationCardProps = {
  user: GetRequest_getRequest_User;
  actions: React.ReactNode;
} & CardProps;

export const InvitationCard: FC<InvitationCardProps> = ({
  user,
  sx,
  actions,
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <Card elevation={1} sx={{ borderRadius: "15px", ...sx }} {...props}>
      <CardMedia
        onClick={() =>
          navigate(`/landing/profil/${user.id}`)
        }
        sx={{ cursor: "pointer" }}
        component="img"
        height="209"
        src={user.photo ? usePhotoUrl(user.photo) : defaultProfil}
      />
      <CardContent sx={{ overflow: "hidden" }}>
        <Typography sx={{ fontSize: "1rem" }}>
          {user.firstname + " " + user.lastname}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>{actions}</CardActions>
    </Card>
  );
};
