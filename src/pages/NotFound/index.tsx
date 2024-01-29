import { Box, Typography } from "@mui/material";
import notfound from "../../assets/page-not-found.png";

const NotFound = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", my: 2 }} >Cette page n'existe pas</Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box component="img" src={notfound} sx={{ width: "50%" }} />
      </Box>
    </Box>
  );
};

export default NotFound;
