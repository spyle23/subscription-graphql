import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect } from "react";
import { UserMenu } from "./UserMenu";
import { DashboardNavbar } from "./DashboardNavbar";
import { Notifications } from "./Notifications";
import { MessageToolbar } from "./MessageToolbar";
import { DiscussionOpenTab } from "./DiscussionOpenTab";
import { useMessage } from "../../hooks/message/useMessage";
import { useLocation } from "react-router-dom";

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
  const options = useMessage();
  const location = useLocation();
  const { writting, data, sendMessage, listenTheme, fetchMore, loading } = options;
  useEffect(() => {
    if (data) {
      console.log("impiry no ato ContainerWithMenu");
    }
  }, [data]);
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
            minHeight: "90vh",
            position: "relative",
          }}
        >
          {children}
          {!location.pathname.includes("messages") &&
            window.innerWidth > 900 && (
              <DiscussionOpenTab
                data={data}
                listenTheme={listenTheme}
                writting={writting}
                sendMessage={sendMessage}
              />
            )}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar
        message={<MessageToolbar {...options} />}
        notification={<Notifications />}
        utilisateur={<UserMenu />}
      />
    </>
  );
};
