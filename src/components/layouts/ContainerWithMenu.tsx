import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import { UserMenu } from "./UserMenu";
import { DashboardNavbar } from "./DashboardNavbar";
import { Notifications } from "./Notifications";
import { useApplicationContext } from "../../hooks";

type ContainerWithMenuProps = {
  children: React.ReactNode;
};

const DashboardLayoutRoot = styled("div")(() => ({
  display: "flex",
  flex: "1 1 auto",
  width: "100vw",
  paddingTop: 64,
}));

export const ContainerWithMenu: FC<ContainerWithMenuProps> = ({
  children,
}): JSX.Element => {
  const { logout } = useApplicationContext();
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
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar
        notification={<Notifications />}
        utilisateur={<UserMenu logout={logout} />}
      />
    </>
  );
};
