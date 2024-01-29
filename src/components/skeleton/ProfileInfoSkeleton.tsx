import { Box, Skeleton, Stack } from "@mui/material";

export const ProfileInfoSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ p: 1 }}>
      <Box sx={{ my: 1 }}>
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
      </Box>
      {[1, 2, 3].map((i) => (
        <Skeleton
          key={i}
          variant="text"
          sx={{ fontSize: "1rem", width: "100%" }}
        />
      ))}
    </Stack>
  );
};
