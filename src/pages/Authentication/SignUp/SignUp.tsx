import { useState } from "react";
import { Email, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { CustomCard } from "../../../components/card/CustomCard";
import { SignupInput } from "../../../types/graphql-types";

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
    control,
  } = useForm<SignupInput>();

  const handleSignUp = (data: SignupInput) => {
    console.log(data);
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
                <Button type="submit" variant="contained">
                  S'inscrire
                </Button>
              </Grid>
            </form>
          </Grid>
        </CardContent>
      </CustomCard>
    </Grid>
  );
};
