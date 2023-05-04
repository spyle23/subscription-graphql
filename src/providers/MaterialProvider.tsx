import { CssBaseline, ThemeProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";
import React from "react";
import { theme } from "../theme";

type MaterialProviderProps = {
  children: React.ReactNode;
};

export const MaterialProvider = ({
  children,
}: MaterialProviderProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        {children}
      </StylesProvider>
    </ThemeProvider>
  );
};
