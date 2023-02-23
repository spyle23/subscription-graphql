import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { CustomCard } from "../../../components/card/CustomCard";
import leftImage from "../../../assets/leftImage.png";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginVariables } from "../../../graphql/user";

export const SignIn = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginVariables>();

  const onLogin = (data: loginVariables) => {
    console.log(data);
  };

  return (
    <Grid item xs={12} md={4}>
      <CustomCard elevation={1}>
        <CardHeader
          title={
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Connexion au plateforme 😆  
            </Typography>
          }
        />
        <CardContent>
          <Grid
            container
            sx={{ justifyContent: "space-around", alignItems: "center" }}
          >
            <Grid item xs={12} md={6}>
              <img src={leftImage} alt="image" width="100%" height="300" />
            </Grid>
            <Grid item xs={12} md={6} sx={{ p: 1 }}>
              <form onSubmit={handleSubmit(onLogin)}>
                <Box>
                  <Typography>email: </Typography>
                  <TextField
                    error={errors.email && true}
                    fullWidth
                    type="email"
                    InputProps={{ endAdornment: <Email /> }}
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Vous devez entrer votre email",
                      },
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "entrer un email valide",
                      },
                    })}
                    FormHelperTextProps={{
                      sx: {
                        width: 300,
                      },
                    }}
                    helperText={errors.email?.message}
                  />
                </Box>
                <Box sx={{ my: 1 }}>
                  <Typography>mot de passe:</Typography>
                  <TextField
                    error={errors.password && true}
                    fullWidth
                    type={show ? "text" : "password"}
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
                    {...register("password", {
                      required: {
                        value: true,
                        message: "votre mot de passe est requis",
                      },
                    })}
                    FormHelperTextProps={{
                      sx: {
                        width: 300,
                      },
                    }}
                    helperText={errors.password?.message}
                  />
                </Box>
                <Button type="submit" variant="contained">
                  Connexion
                </Button>
              </form>
              <Divider sx={{ my: 1 }} />
              <NavLink to="/auth/signup">Pas encore de compte?</NavLink>
            </Grid>
          </Grid>
        </CardContent>
      </CustomCard>
    </Grid>
  );
};
