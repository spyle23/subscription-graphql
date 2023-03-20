import { Box, Grid, Typography } from "@mui/material";
import { useApplicationContext } from "../../hooks";

export const Message = (): JSX.Element => {
  const { dispatchSnack } = useApplicationContext();
  return (
    <Grid container>
      <Grid item md={4} sx={{ p: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            📧 Messages
          </Typography>
        </Box>
      </Grid>
      <Grid item md={8}></Grid>
    </Grid>
  );
};
