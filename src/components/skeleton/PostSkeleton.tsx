import { Box, Skeleton, Stack } from "@mui/material";

export const PostSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ p: 2, width: { xs: 350, md: 500 } }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={40} height={40} sx={{ mr: 1 }} />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1rem", width: { xs: "80%", md: 400 } }}
        />
      </Box>
      <Skeleton
        variant="rounded"
        height={100}
        sx={{ width: { xs: "100%", md: 500 } }}
      />
    </Stack>
  );
};
