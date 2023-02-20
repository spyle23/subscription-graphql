import React, { FC, createContext, useState, useMemo } from "react";
import { login_login_data as IUser } from "../../graphql/user/types/login";
import { IApplicationContext } from "./type";

export const ApplicationContext = createContext<IApplicationContext>(
  {} as IApplicationContext
);

export const ApplicationContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser>();
  const [loadingApp, setLoadingApp] = useState<boolean>(false);

  const memoizedContext = useMemo(
    () => ({
      user,
      setUser,
      loadingApp,
      setLoadingApp,
    }),
    [user, setUser, loadingApp, setLoadingApp]
  );

  return (
    <ApplicationContext.Provider value={memoizedContext}>
      {children}
    </ApplicationContext.Provider>
  );
};
