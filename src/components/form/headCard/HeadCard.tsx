import { Box, Typography } from "@mui/material";
import { useApplicationContext } from "../../../hooks";
import DefaultProfil from "../../../assets/default_profil.png";
import { AccountCircle } from "@mui/icons-material";

export const HeadCard = (): JSX.Element => {
  const { user } = useApplicationContext();

  console.log(user?.firstname);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ mr: 1 }}>
        {user?.photo ? (
          <img src={user?.photo} alt="profile" />
        ) : (
          <AccountCircle sx={{ fontSize: "2em" }} />
        )}
      </Box>
      {user?.firstname && user?.lastname && (
        <Typography>{user.firstname + " " + user.lastname}</Typography>
      )}
    </Box>
  );
};
