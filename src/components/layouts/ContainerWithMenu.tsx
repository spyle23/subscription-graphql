import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useMemo, useEffect } from "react";
import { UserMenu } from "./UserMenu";
import { DashboardNavbar } from "./DashboardNavbar";
import { Notifications } from "./Notifications";
import { MessageToolbar } from "./MessageToolbar";
import {
  ActionMessageType,
  MessageContexteType,
  MessageGlobalApp,
} from "../../types/message";
import { DiscussionOpenTab } from "./DiscussionOpenTab";
import { useMessage } from "../../hooks/message/useMessage";
import { MessageContext } from "../../pages/Message/Message";
import { useLocation } from "react-router-dom";

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
  const options = useMessage();
  const location = useLocation();
  const { sendMessage, currentMessage, dispatch, writting, data } = options;
  const memoizedMessage: MessageContexteType = useMemo(
    () => ({
      currentMessage,
      dispatch,
    }),
    [currentMessage, dispatch]
  );
  return (
    <>
      <MessageContext.Provider value={memoizedMessage}>
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
            {!location.pathname.includes("messages") &&
              window.innerWidth > 900 && (
                <DiscussionOpenTab
                  data={data}
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
      </MessageContext.Provider>
    </>
  );
};
