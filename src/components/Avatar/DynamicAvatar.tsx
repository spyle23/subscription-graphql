import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, BoxProps } from "@mui/material";

type DynamicAvatarProps<T> = {
  user?: T;
} & BoxProps;

export const DynamicAvatar = <
  T extends { photo: string | null; firstname: string | null }
>({
  user,
  sx,
  ...props
}: DynamicAvatarProps<T>) => {
  return (
    <Box sx={{ mr: 1, ...sx }} {...props}>
      {user?.photo ? (
        <Avatar alt={user?.firstname || "profile"} src={user?.photo} />
      ) : (
        <AccountCircle sx={{ fontSize: "2em" }} />
      )}
    </Box>
  );
};
