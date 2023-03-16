import { useState } from "react";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CustomCard } from "../../../components/card/CustomCard";
import { SignupInput } from "../../../types/graphql-types";
import { useApplicationContext } from "../../../hooks";
import { useNavigate } from "react-router-dom";

const civilites: string[] = [
  "Malagasy",
  "Français",
  "Anglais",
  "Américain",
  "Chinois",
  "Belge",
  "Allemand",
  "Congolais",
  "Japonais",
  "Russe",
  "Corréen",
  "Egyptien",
  "Cameronais",
  "Mongol",
];

export const SignUp = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupInput>();
  const { signupUser, signupLoading, signupError, dispatchSnack } =
    useApplicationContext();
  const navigate = useNavigate();

  const handleSignUp = async (data: SignupInput) => {
    const result = await signupUser(data);
    if (result.success) {
      dispatchSnack({
        open: true,
        message: result.message,
        severity: "success",
      });
      navigate("/subscription-graphql/landing");
    }
  };

  return (
    <Grid item xs={12} md={6}>
      <CustomCard elevation={1}>
        <CardHeader
          title={
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Inscription au plateforme 😇
            </Typography>
          }
        />
        <CardContent>
          <Grid container sx={{ justifyContent: "center" }}>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <Grid item xs={12}>
                <Typography>Nom: </Typography>
                <TextField fullWidth type="text" {...register("lastname")} />
              </Grid>
              <Grid item xs={12}>
                <Typography>Prénom: </Typography>
                <TextField fullWidth type="text" {...register("firstname")} />
              </Grid>
              <Grid item xs={12}>
                <Typography>Civilité: </Typography>
                <Autocomplete
                  disablePortal
                  options={civilites}
                  renderInput={(params) => (
                    <TextField {...params} {...register("civilite")} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
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
                      width: "100%",
                    },
                  }}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>mot de passe:</Typography>
                <TextField
                  error={errors.password && true}
                  fullWidth
                  type={show ? "text" : "password"}
                  InputProps={{
                    endAdornment: show ? (
                      <VisibilityOff
                        sx={{ cursor: "pointer" }}
                        onClick={() => setShow((curr: boolean) => !curr)}
                      />
                    ) : (
                      <Visibility
                        sx={{ cursor: "pointer" }}
                        onClick={() => setShow((curr: boolean) => !curr)}
                      />
                    ),
                  }}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "votre mot de passe est requis",
                    },
                    minLength: {
                      value: 8,
                      message:
                        "votre mot de passe doit au moins être à 8 charactère",
                    },
                  })}
                  FormHelperTextProps={{
                    sx: {
                      width: "100%",
                    },
                  }}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12} sx={{ my: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={signupLoading}
                >
                  {signupLoading && (
                    <CircularProgress
                      sx={{ color: "white", width: "16px", height: "16px" }}
                    />
                  )}
                  S'inscrire
                </Button>
              </Grid>
              <Grid item xs={12}>
                {signupError && (
                  <Typography sx={{ textAlign: "start" }} color="error">
                    {signupError}
                  </Typography>
                )}
              </Grid>
            </form>
          </Grid>
        </CardContent>
      </CustomCard>
    </Grid>
  );
};
