import {
  ApplicationContext,
  ISnackContext,
  SnackbarContext,
} from "../../contexts";
import { IApplicationContext } from "../../contexts/application/type";
import { IRequest, UseApplicationType } from "./type";
import { useContext, useCallback, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { UserAuthStateEnum } from "../../types/UserType";
import { AuthStorage, LocalStorage } from "../../utils/AuthStorage";
import { TokenContext } from "../../App";
import { useMutation } from "@apollo/client";
import {
  login,
  loginVariables,
  login_login_data,
} from "../../graphql/user/types/login";
import { LOGIN, SIGNUP } from "../../graphql/user/mutation";
import {
  signup,
  signupVariables,
  signup_signup_data,
} from "../../graphql/user";
import { SignupInput } from "../../types/graphql-types";

export const useApplicationContext = (): UseApplicationType &
  IApplicationContext &
  ISnackContext => {
  const { setToken } = useContext(TokenContext);
  const contexts = useContext(ApplicationContext);
  const snackbarContexts = useContext(SnackbarContext);
  // const navigate = useNavigate();

  const [userAuthStatus, setUserAuthStatus] = useState<UserAuthStateEnum>(
    UserAuthStateEnum.WAITING
  );
  const { user, setUser } = contexts;
  const loadUser = useCallback((): void => {
    if (user) {
      setUserAuthStatus(UserAuthStateEnum.AUTHENTICATED);
    }
    if (!user) {
      const checkuser = LocalStorage.isAuth();
      if (checkuser) {
        setUserAuthStatus(UserAuthStateEnum.AUTHENTICATED);
        setUser(checkuser);
      } else {
        setUserAuthStatus(UserAuthStateEnum.UNAUTHENTICATED);
      }
    }
  }, [setUser, user]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const logout = (): void => {
    AuthStorage.clearToken(() => {
      setUser(undefined);
      setToken(undefined);
      // navigate("/subscription-graphql/auth/login");
      // window.location.reload();
    });
  };

  const [sign, { loading: signinLoading, error: signinError }] = useMutation<
    login,
    loginVariables
  >(LOGIN);

  const signin = async (
    email: string,
    password: string
  ): Promise<IRequest<login_login_data>> => {
    const res = await sign({
      variables: {
        email,
        password,
      },
    });
    const users = res.data?.login.data;
    if (users?.id) {
      LocalStorage.authenticate(users);
      setToken(users.token);
      setUser(users);
    }
    const response: IRequest<login_login_data> = {
      success: res.data?.login.success,
      message: res.data?.login.message,
      data: res.data?.login.data,
    };
    return response;
  };
  const [signup, { loading: signupLoading, error: signupError }] = useMutation<
    signup,
    signupVariables
  >(SIGNUP);

  const signupUser = async (
    userInput: SignupInput
  ): Promise<IRequest<signup_signup_data>> => {
    const res = await signup({
      variables: {
        userInput,
      },
    });
    const users = res.data?.signup.data;
    if (users?.id) {
      LocalStorage.authenticate(users);
      setToken(users.token);
      setUser(users);
    }
    const response: IRequest<signup_signup_data> = {
      success: res.data?.signup.success,
      message: res.data?.signup.message,
      data: res.data?.signup.data,
    };
    return response;
  };
  return {
    user,
    userAuthStatus,
    signinError: signinError?.message,
    signin,
    signupUser,
    signupError: signupError?.message,
    signupLoading,
    logout,
    signinLoading,
    ...snackbarContexts,
    ...contexts,
  };
};
