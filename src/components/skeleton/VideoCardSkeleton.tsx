import { Skeleton } from "@mui/material";

export const VideoCardSkeleton = () => {
  return (
    <Skeleton
      variant="rectangular"
      sx={{ height: { xs: undefined, md: "300px" }, width: "100%" }}
    />
  );
};
