import { Avatar, Box, BoxProps } from "@mui/material";
import { usePhotoUrl } from "../../hooks/application/usePhotoUrl";
import profile from "../../assets/profil.png";

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
  const url = "groupName" in user ? user.coverPhoto : user.photo;
  return (
    <Box sx={{ mr: 1, ...sx }} {...props}>
      <Avatar
        alt={"profile"}
        src={url ? usePhotoUrl(url) : profile}
        sx={{ width: 36, height: 36 }}
      />
    </Box>
  );
};
