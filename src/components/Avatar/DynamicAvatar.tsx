import { Avatar, Box, BoxProps, SxProps, Theme } from "@mui/material";
import { usePhotoUrl } from "../../hooks/application/usePhotoUrl";
import profile from "../../assets/profil.png";
import defaultGroup from "../../assets/defaultGroup.jpg";

type DynamicAvatarProps<T> = {
  user: T;
  avatarSx?: SxProps<Theme>;
} & BoxProps;

export const DynamicAvatar = <
  T extends
    | { photo: string | null; firstname: string | null; status: boolean | null }
    | { groupName: string; coverPhoto: string | null }
>({
  user,
  sx,
  avatarSx,
  ...props
}: DynamicAvatarProps<T>) => {
  if (!user) return null;
  const urlGroup =
    "groupName" in user && user.coverPhoto
      ? usePhotoUrl(user.coverPhoto)
      : defaultGroup;
  const urlUser =
    "firstname" in user && user.photo ? usePhotoUrl(user.photo) : profile;
  return (
    <Box
      sx={{ mr: 1, position: "relative", height: "max-content", ...sx }}
      {...props}
    >
      <Avatar
        alt={"profile"}
        src={"groupName" in user ? urlGroup : urlUser}
        sx={{ width: 36, height: 36, ...avatarSx }}
      />
      {"firstname" in user && user.status && (
        <Box
          sx={{
            width: "10px",
            height: "10px",
            backgroundColor: "lightgreen",
            borderRadius: "50%",
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        />
      )}
    </Box>
  );
};
