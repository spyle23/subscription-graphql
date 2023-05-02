import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apolloClient";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";
import { AuthStorage } from "./utils/AuthStorage";
import { ApolloProvider } from "@apollo/client";
import { MainRouter } from "./routers";
import { theme } from "./theme";
import { ContextProvider } from "./contexts/Providers";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
} from "react";
import { GraphqlProvider } from "./providers/GraphqlProvider";
import { MaterialProvider } from "./providers/MaterialProvider";

export const TokenContext = createContext<{
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
}>({
  token: undefined,
  setToken: () => {},
});

function App() {
  // const [token, setToken] = useState<string>();
  // const tokenFromstorage = AuthStorage.isAuth()?.token;
  // const client = apolloClient(token || tokenFromstorage);

  // const memoizedContext = useMemo(() => ({ token, setToken }), [token]);

  return (
    <BrowserRouter>
      <GraphqlProvider>
        <MaterialProvider>
          <MainRouter />
        </MaterialProvider>
      </GraphqlProvider>
      {/* <TokenContext.Provider value={memoizedContext}>
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
      </TokenContext.Provider> */}
    </BrowserRouter>
  );
}

export default App;
