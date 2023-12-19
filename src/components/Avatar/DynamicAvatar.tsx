import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, BoxProps } from "@mui/material";
import { usePhotoUrl } from "../../hooks/application/usePhotoUrl";

type DynamicAvatarProps<T> = {
  user: T;
} & BoxProps;

export const DynamicAvatar = <
  T extends
    | { photo: string | null; firstname: string | null }
    | { groupName: string; coverPhoto: string | null }
>({
  user,
  sx,
  ...props
}: DynamicAvatarProps<T>) => {
  const url = "groupName" in user ? user.coverPhoto : user.photo
  return (
    <Box sx={{ mr: 1, ...sx }} {...props}>
      {url ? (
        <Avatar
          alt={"profile"}
          src={usePhotoUrl(url)}
        />
      ) : (
        <AccountCircle sx={{ fontSize: "2em" }} />
      )}
    </Box>
  );
};
