import { Container } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";
import { useApplicationContext } from "../../hooks";
import { UserAuthStateEnum } from "../../types/UserType";

export const AuthenticationRoute = () => {
  const { userAuthStatus } = useApplicationContext();
  if (userAuthStatus === UserAuthStateEnum.AUTHENTICATED) {
    return <Navigate to="/subscription-graphql/landing" />;
  }
  return (
    <Container>
      <Routes>
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Container>
  );
};
