import { Box, Card, Typography } from "@mui/material";

export const Contact = () => {
  return (
    <Card
      elevation={1}
      sx={{
        position: "fixed",
        right: "10px",
        display: { xs: "none", md: "block" },
        width: "25vw",
        height: "85vh",
        bottom: "10px",
        p: 1,
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Contacts
      </Typography>
      
    </Card>
  );
};
