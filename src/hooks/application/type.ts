import { ApolloError } from "@apollo/client";
import { ReducerActionType } from "../../contexts";
import { UserAuthStateEnum } from "../../types/UserType";

export type IRequest = {
  success?: string;
  error?: string;
};

export type UseApplicationType = {
  userAuthStatus: UserAuthStateEnum;
  logout: () => void;
  dispatchSnack: React.Dispatch<ReducerActionType>;
  // upload
  //   uploadLoading?: boolean;
  //   uploadError?: ApolloError;
  //   uploadFile: (file: UploadInput) => Promise<string | undefined>;

  // new application
  signinLoading?: boolean;
  signinError?: string;
  signin: (email: string, password: string) => Promise<IRequest>;
};
