import React, { FC, useMemo, useState } from "react";
import { TokenContext } from "../App";
import { ApolloProvider } from "@apollo/client";
import { ContextProvider } from "../contexts/Providers";
import { AuthStorage } from "../utils/AuthStorage";
import { apolloClient } from "../apolloClient";

type GraphqlProviderProps = {
  children: React.ReactNode;
};

export const GraphqlProvider = ({ children }: GraphqlProviderProps) => {
  const [token, setToken] = useState<string>();
  const tokenFromstorage = AuthStorage.isAuth()?.token;
  const client = apolloClient(token || tokenFromstorage);

  const memoizedContext = useMemo(() => ({ token, setToken }), [token]);
  return (
    <TokenContext.Provider value={memoizedContext}>
      <ApolloProvider client={client}>
        <ContextProvider>{children}</ContextProvider>
      </ApolloProvider>
    </TokenContext.Provider>
  );
};
