import { CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useApplicationContext } from "../hooks";
import { UserAuthStateEnum } from "../types/UserType";

export const PrivateRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const { userAuthStatus } = useApplicationContext();

  if (userAuthStatus === UserAuthStateEnum.WAITING) {
    return <CircularProgress />;
  }
  if (userAuthStatus === UserAuthStateEnum.AUTHENTICATED) {
    return children;
  }
  return <Navigate to="/auth/login" />;
};
