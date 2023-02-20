import { LOCALSTORAGE } from "../constants";
import { login_login_data as IUser } from "../graphql/user/types/login";

export const AuthStorage = {
  isAuth: (): IUser | undefined => {
    if (typeof window === undefined) return undefined;
    if (localStorage.getItem(LOCALSTORAGE))
      return JSON.parse(localStorage.getItem(LOCALSTORAGE) as string) as IUser;
    return undefined;
  },
  authenticate: (user: IUser, callback?: (data: IUser) => void): unknown => {
    if (typeof window !== undefined) {
      localStorage.setItem(LOCALSTORAGE, JSON.stringify(user));
      return callback && callback(user);
    }
    return undefined;
  },
  clearToken: (callback: () => void) => {
    if (typeof window !== undefined) localStorage.removeItem(LOCALSTORAGE);
    callback();
  },
};

export const LocalStorage = {
  isAuth: (): IUser | undefined => {
    if (typeof window === undefined) return undefined;
    if (localStorage.getItem(LOCALSTORAGE))
      return JSON.parse(localStorage.getItem(LOCALSTORAGE) as string) as IUser;
    return undefined;
  },
  authenticate: (
    business: IUser,
    callback?: (data: IUser) => void
  ): unknown => {
    if (typeof window !== undefined) {
      localStorage.setItem(LOCALSTORAGE, JSON.stringify(business));
      return callback && callback(business);
    }
    return undefined;
  },
  clearToken: (callback: () => void) => {
    if (typeof window !== undefined) localStorage.removeItem(LOCALSTORAGE);
    callback();
  },
};
