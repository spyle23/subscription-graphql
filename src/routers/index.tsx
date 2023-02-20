import { Navigate, Route, Routes } from "react-router-dom";
import { AuthenticationRoute } from "../pages/Authentication/AuthenticationRoute";
import { PrivateRoute } from "./PrivateRoute";

export const MainRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<Navigate to="landing" />} />
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
