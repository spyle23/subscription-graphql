import { Box, Grid, Typography } from "@mui/material";
import { useApplicationContext } from "../../hooks";
import { ContainerMessage } from "./components/ContainerMessage";

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
        <ContainerMessage sx={{ my: 2 }} />
      </Grid>
      <Grid item md={8}>
      </Grid>
    </Grid>
  );
};
