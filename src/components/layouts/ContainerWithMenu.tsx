import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useReducer, Reducer } from "react";
import { UserMenu } from "./UserMenu";
import { DashboardNavbar } from "./DashboardNavbar";
import { Notifications } from "./Notifications";
import { MessageToolbar } from "./MessageToolbar";
import { ActionMessageType, MessageGlobalApp } from "../../types/message";
import { DiscussionOpenTab } from "./DiscussionOpenTab";

type ContainerWithMenuProps = {
  children: React.ReactNode;
};

const DashboardLayoutRoot = styled("div")(() => ({
  display: "flex",
  flex: "1 1 auto",
  width: "98vw",
  paddingTop: 64,
}));

export const ContainerWithMenu: FC<ContainerWithMenuProps> = ({
  children,
}): JSX.Element => {
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
            position: "relative",
          }}
        >
          {children}
          <DiscussionOpenTab />
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar
        message={<MessageToolbar />}
        notification={<Notifications />}
        utilisateur={<UserMenu />}
      />
    </>
  );
};
