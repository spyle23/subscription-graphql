import { Navigate, Route, Routes } from "react-router-dom";
import { AuthenticationRoute } from "../pages/Authentication/AuthenticationRoute";
import Landing from "../pages/Landing/Landing";
import { PrivateRoute } from "./PrivateRoute";

const PrivateRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<Landing />} />
    </Routes>
  );
};

export const MainRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<PrivateRouter />} />
      <Route path="auth/*" element={<AuthenticationRoute />} />
      <Route
        path="landing/*"
        element={
          <PrivateRoute>
            <PrivateRouter />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
