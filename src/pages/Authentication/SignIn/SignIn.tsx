import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { Container, Card, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export const SignIn = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <Container>
      <Card elevation={1}>
        <CardContent>
          <Box></Box>
          <Box>
            <form>
              <Typography>email: </Typography>
              <TextField InputProps={{ endAdornment: <Email /> }} />
              <Typography sx={{ mt: 1 }}>mot de passe:</Typography>
              <TextField
                InputProps={{
                  endAdornment: show ? (
                    <VisibilityOff
                      sx={{ cursor: "pointer" }}
                      onClick={() => setShow((curr) => !curr)}
                    />
                  ) : (
                    <Visibility
                      sx={{ cursor: "pointer" }}
                      onClick={() => setShow((curr) => !curr)}
                    />
                  ),
                }}
              />
            </form>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
