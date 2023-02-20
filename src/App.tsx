import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apolloClient";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";
import { AuthStorage } from "./utils/AuthStorage";
import { ApolloProvider } from "@apollo/client";
import { MainRouter } from "./routers";
import { theme } from "./theme";
import { ContextProvider } from "./contexts/Providers";

function App() {
  const token = AuthStorage.isAuth()?.token;
  const client = apolloClient(token || undefined);
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ContextProvider>
          <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <CssBaseline />
              <MainRouter />
            </StylesProvider>
          </ThemeProvider>
        </ContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
