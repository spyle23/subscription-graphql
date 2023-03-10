import { Navigate, Route, Routes } from "react-router-dom";
import { ContainerWithMenu } from "../components/layouts/ContainerWithMenu";
import { AuthenticationRoute } from "../pages/Authentication/AuthenticationRoute";
import Landing from "../pages/Landing/Landing";
import { Message } from "../pages/Message/Message";
import { PrivateRoute } from "./PrivateRoute";

const PrivateRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="messages" element={<Message />} />
    </Routes>
  );
};

export const MainRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<Navigate to="landing" />} />
      <Route path="auth/*" element={<AuthenticationRoute />} />
      <Route
        path="landing/*"
        element={
          <PrivateRoute>
            <ContainerWithMenu>
              <PrivateRouter />
            </ContainerWithMenu>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
