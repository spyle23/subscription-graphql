import { Box, Grid, Skeleton, Stack } from "@mui/material";

export const FriendSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ p: 1 }}>
      <Box sx={{ my: 1 }}>
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
      </Box>
      <Grid container>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Grid key={i} item xs={4} sx={{ p: 1 }}>
            <Skeleton
              variant="rounded"
              sx={{ width: "100%", height: "180px" }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "0.5rem", width: "100%" }}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
