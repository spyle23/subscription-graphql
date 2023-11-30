import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./routers";
import { createContext, Dispatch, SetStateAction } from "react";
import { GraphqlProvider } from "./providers/GraphqlProvider";
import { MaterialProvider } from "./providers/MaterialProvider";
import { DiscussionContextProvider } from "./contexts/message/DiscussionContext";

export const TokenContext = createContext<{
  token: string | undefined;
  setToken: Dispatch<SetStateAction<string | undefined>>;
}>({
  token: undefined,
  setToken: () => {},
});

function App() {
  return (
    <BrowserRouter>
      <GraphqlProvider>
        <MaterialProvider>
          <DiscussionContextProvider>
            <MainRouter />
          </DiscussionContextProvider>
        </MaterialProvider>
      </GraphqlProvider>
    </BrowserRouter>
  );
}

export default App;
