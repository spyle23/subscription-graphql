import { Avatar, Box, Typography } from "@mui/material";
import { useApplicationContext } from "../../../hooks";
import { DynamicAvatar } from "../../Avatar/DynamicAvatar";

export const HeadCard = (): JSX.Element | null => {
  const { user } = useApplicationContext();

  if (!user) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <DynamicAvatar user={user} />
      {user?.firstname && user?.lastname && (
        <Box>
          <Typography>{user.firstname + " " + user.lastname}</Typography>
        </Box>
      )}
    </Box>
  );
};
