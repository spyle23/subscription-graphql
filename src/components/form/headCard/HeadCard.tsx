import { FC } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useApplicationContext } from "../../../hooks";
import { AccountCircle } from "@mui/icons-material";

export const HeadCard = (): JSX.Element => {
  const { user } = useApplicationContext();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ mr: 1 }}>
        {user?.photo ? (
          <Avatar alt={user?.firstname || "profile"} src={user?.photo} />
        ) : (
          <AccountCircle sx={{ fontSize: "2em" }} />
        )}
      </Box>
      {user?.firstname && user?.lastname && (
        <Box>
          <Typography>{user.firstname + " " + user.lastname}</Typography>
        </Box>
      )}
    </Box>
  );
};
