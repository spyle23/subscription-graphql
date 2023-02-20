import { login_login_data as IUser } from "../../graphql/user/types/login";
import { Dispatch, SetStateAction } from "react";

export type IApplicationContext = {
  user?: IUser;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  loadingApp: boolean;
  setLoadingApp: Dispatch<SetStateAction<boolean>>;
};
