import { useContext } from "react";
import { Box, Grid } from "@mui/material";
import { DiscussionContext } from "../../contexts/message";
import { DiscussionCard } from "../card/DiscussionCard";
import { useApplicationContext } from "../../hooks";

export const DiscussionOpenTab = () => {
  const { discussion } = useContext(DiscussionContext);
  const { user } = useApplicationContext();
  return (
    <Box sx={{ width: "70%", position: "fixed", bottom: 0, right: 0 }}>
      <Grid container sx={{ width: "90%" }}>
        {discussion
          .filter((val) => val.openMessage)
          .map((i) => (
            <Grid item md={4} key={i.userId} sx={{ p: 1 }}>
              <DiscussionCard discussion={i} user={user} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
