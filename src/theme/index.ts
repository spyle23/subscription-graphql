import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#512da8",
      light: "#b39ddb",
      dark: "#311b92",
      contrastText: "#fff",
    },
    secondary: {
      main: "#c2185b",
      light: "#f48fb1",
      dark: "#880e4f",
      contrastText: "#fff",
    },
  },
  typography: {
    h1: {
      color: "#512da8",
      fontSize: 40,
    },
    h2: {
      fontSize: 35,
      fontWeight: "bold",
    },
    h3: {
      fontWeight: 400,
      fontSize: 28,
    },
    h4: {
      color: "#c2185b",
      fontSize: 26,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: "bold",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: 0,
            "& .MuiAutocomplete-input": {
              padding: 10,
            },
          },
        },
        input: {
          padding: 10,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
  },
});
