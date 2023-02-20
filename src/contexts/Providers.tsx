import { FC } from "react";
import { ApplicationContextProvider } from "./application";
import { SnackbarCustomProvider } from "./snackbar";

export const ContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ApplicationContextProvider>
      <SnackbarCustomProvider>{children}</SnackbarCustomProvider>
    </ApplicationContextProvider>
  );
};
