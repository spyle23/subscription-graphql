/* eslint-disable react/jsx-props-no-spreading */
import Snackbar from "@mui/material/Snackbar";
import React, { createContext, FC, Reducer, useReducer } from "react";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import { Avatar, Box, Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";
import profile from "../../assets/profil.png";
import { usePhotoUrl } from "../../hooks/application/usePhotoUrl";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export type ISnackContext = {
  dispatchSnack: React.Dispatch<ReducerActionType>;
};
export const SnackbarContext = createContext<ISnackContext>(
  {} as ISnackContext
);
const initialState = {
  open: false,
  severity: undefined,
  message: "",
};

interface ReducerStateType {
  open: boolean;
  severity?: AlertColor;
  message?: string;
  photo?: string;
  withImage?: boolean;
  subtitle?: string;
}
export interface ReducerActionType {
  open: boolean;
  severity?: AlertColor;
  message?: string;
  photo?: string;
  withImage?: boolean;
  subtitle?: string;
}
function reducer(
  state: ReducerStateType,
  action: ReducerActionType
): ReducerStateType {
  switch (action.open) {
    case true:
      return {
        open: true,
        severity: action.severity,
        message: action.message,
        photo: action.photo,
        withImage: action.withImage,
        subtitle: action.subtitle,
      };
    case false:
      return {
        open: false,
        severity: undefined,
        message: "",
        withImage: undefined,
        photo: undefined,
        subtitle: undefined,
      };
    default:
      throw new Error();
  }
}

export const SnackbarCustomProvider: FC<{
  children: React.ReactNode;
}> = ({ children }): JSX.Element => {
  const [
    { open, severity, message, withImage, photo, subtitle },
    dispatchSnack,
  ] = useReducer<Reducer<ReducerStateType, ReducerActionType>>(
    reducer,
    initialState
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    event?.preventDefault();
    if (reason === "clickaway") {
      return;
    }

    dispatchSnack({
      open: false,
      severity: undefined,
    });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SnackbarContext.Provider value={{ dispatchSnack }}>
      <SnackbarProvider maxSnack={10}>{children}</SnackbarProvider>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%", zIndex: 999999999 }}
          icon={
            withImage ? (
              <Avatar
                alt={"photo"}
                src={photo ? usePhotoUrl(photo) : profile}
                sx={{ width: 36, height: 36 }}
              />
            ) : undefined
          }
        >
          <Box>
            <Typography variant="subtitle1">{message}</Typography>
            <Typography variant="subtitle2">{subtitle}</Typography>
          </Box>
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
