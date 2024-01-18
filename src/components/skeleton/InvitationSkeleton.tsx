import { Box, Skeleton, Stack } from "@mui/material";

export const InvitationSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" height="209px" sx={{ width: "100%" }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
      <Box sx={{ display: "flex", justifyContent: "space-around" }} >
        <Skeleton variant="rounded" height="30px" sx={{ width: "30%", borderRadius: "15px" }} />
        <Skeleton variant="rounded" height="30px" sx={{ width: "30%", borderRadius: "15px" }} />
      </Box>
    </Stack>
  );
};
