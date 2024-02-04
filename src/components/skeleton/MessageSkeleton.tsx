import { Box, Skeleton, Stack } from "@mui/material";

export const MessageSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ p: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={36} height={36} sx={{ mr: 1 }} />
        <Box sx={{ width: "80%" }}>
          <Skeleton variant="text" width={50} height={15} />
          <Skeleton variant="text" sx={{ width: "100%" }} />
        </Box>
      </Box>
    </Stack>
  );
};

export const ContactSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ p: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={36} height={36} sx={{ mr: 1 }} />
        <Skeleton variant="text" height={15} width={100} />
      </Box>
    </Stack>
  );
};

export const NotificationSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ p: 1 }}>
      <Skeleton variant="text" height={15} sx={{ width: "100%" }} />
      <Skeleton variant="rounded" height={20} sx={{ width: "100%" }} />
    </Stack>
  );
};
