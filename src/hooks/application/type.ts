import { login_login_data } from "../../graphql/user";
import { ReducerActionType } from "../../contexts";
import { UserAuthStateEnum } from "../../types/UserType";

export type IRequest<T> = {
  success?: boolean;
  message?: string;
  data?: T | null;
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
  signin(email: string, password: string): Promise<IRequest<login_login_data>>;
};
