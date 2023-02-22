import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";

export const AuthenticationRoute = () => {
  return (
    <Container>
      <Routes>
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </Container>
  );
};
