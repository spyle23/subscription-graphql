import { Box, Card, CardProps, Typography } from "@mui/material";
import { Profile_profile_user } from "../../../graphql/user";
import EmailIcon from "@mui/icons-material/Email";
import FlagIcon from "@mui/icons-material/Flag";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { FC } from "react";
import moment from "moment";

type UserInfoProps = {
  userInfo?: Profile_profile_user;
} & CardProps;
export const UserInfo: FC<UserInfoProps> = ({ userInfo, sx, ...props }) => {
  return (
    <Card elevation={1} sx={{ p: 1, ...sx }} {...props}>
      <Typography variant="h4" textAlign="center">
        Information du compte:
      </Typography>
      <Box sx={{ p: 1 }}>
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <EmailIcon sx={{ mr: 1 }} />
          Addresse email: <strong>{userInfo?.email}</strong>
        </Typography>
        {userInfo?.civilite && (
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            <FlagIcon sx={{ mr: 1 }} />
            Nationalité: <strong>{userInfo?.civilite}</strong>
          </Typography>
        )}
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <QueryBuilderIcon sx={{ mr: 1 }} />
          Membre depuis
          {moment(userInfo?.createdAt).format("DD MMMM YYYY ")}
        </Typography>
      </Box>
    </Card>
  );
};
