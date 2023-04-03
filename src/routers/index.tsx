import { Navigate, Route, Routes } from "react-router-dom";
import { ContainerWithMenu } from "../components/layouts/ContainerWithMenu";
import { AuthenticationRoute } from "../pages/Authentication/AuthenticationRoute";
import Landing from "../pages/Landing/Landing";
import { Message } from "../pages/Message/Message";
import { PrivateRoute } from "./PrivateRoute";
import { Profile } from "../pages/Profile/Profile";

const PrivateRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="messages" element={<Message />} />
      <Route path="profil" element={<Profile />} />
    </Routes>
  );
};

export const MainRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/subscription-graphql/" element={<Navigate to="landing" />} />
      <Route path="/subscription-graphql/auth/*" element={<AuthenticationRoute />} />
      <Route
        path="/subscription-graphql/landing/*"
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
