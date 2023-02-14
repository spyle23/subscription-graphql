import { BrowserRouter } from "react-router-dom";
import { apolloClient } from "./apolloClient";
import { AuthStorage } from "./utils/AuthStorage";
import { ApolloProvider } from "@apollo/client";

function App() {
  const token = AuthStorage.isAuth()?.token;
  const client = apolloClient(token || undefined);
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
