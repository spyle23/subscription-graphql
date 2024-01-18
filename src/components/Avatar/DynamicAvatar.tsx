import { Avatar, Box, BoxProps } from "@mui/material";
import { usePhotoUrl } from "../../hooks/application/usePhotoUrl";
import profile from "../../assets/profil.png";

type DynamicAvatarProps<T> = {
  user: T;
} & BoxProps;

export const DynamicAvatar = <
  T extends
    | { photo: string | null; firstname: string | null; status: boolean | null }
    | { groupName: string; coverPhoto: string | null }
>({
  user,
  sx,
  ...props
}: DynamicAvatarProps<T>) => {
  if (!user) return null;
  const url = "groupName" in user ? user.coverPhoto : user.photo;
  return (
    <Box
      sx={{ mr: 1, position: "relative", height: "max-content", ...sx }}
      {...props}
    >
      <Avatar
        alt={"profile"}
        src={url ? usePhotoUrl(url) : profile}
        sx={{ width: 36, height: 36 }}
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
