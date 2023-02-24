import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import Loading from "../../assets/loadingApp.svg";
import { useApplicationContext } from "../../hooks";
import { DashboardNavbar } from "./DashboardNavbar";

type ContainerWithMenuProps = {
  children: React.ReactNode;
};

const DashboardLayoutRoot = styled("div")(() => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
}));

export const ContainerWithMenu: FC<ContainerWithMenuProps> = ({
  children,
}): JSX.Element => {
  const { loadingApp } = useApplicationContext();
  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
            background: "#f8f8f8",
            minHeight: "92vh",
          }}
        >
          {loadingApp ? (
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Loading />
            </Box>
          ) : (
            children
          )}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar />
    </>
  );
};
