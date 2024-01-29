import { Box, Skeleton, Stack } from "@mui/material";

export const CommentSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ p: 1 }} >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1 }} />
        <Skeleton variant="rounded" height={40} sx={{ width: "100%" }} />
      </Box>
    </Stack>
  );
};