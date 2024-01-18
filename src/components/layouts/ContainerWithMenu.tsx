import { styled } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { UserMenu } from "./UserMenu";
import { DashboardNavbar } from "./DashboardNavbar";
import { Notifications } from "./Notifications";
import { MessageToolbar } from "./MessageToolbar";
import { DiscussionOpenTab } from "./DiscussionOpenTab";
import { useMessage } from "../../hooks/message/useMessage";
import { useLocation } from "react-router-dom";
import { useMutation, useSubscription } from "@apollo/client";
import {
  ChangeStatus,
  ChangeStatusVariables,
} from "../../graphql/user/types/ChangeStatus";
import { STATUS } from "../../graphql/user";
import { ListenCallModal } from "../modal/ListenCallModal";
import {
  ListenCall,
  ListenCallVariables,
} from "../../graphql/videoCall/types/ListenCall";
import { HANDLE_CALL, LISTEN_CALL } from "../../graphql/videoCall";
import {
  HandleCallMutation,
  HandleCallMutationVariables,
} from "../../graphql/videoCall/types/HandleCallMutation";

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
  const { writting, data, sendMessage, listenTheme, user } = options;
  const [exec] = useMutation<ChangeStatus, ChangeStatusVariables>(STATUS);
  const { data: listenCall } = useSubscription<ListenCall, ListenCallVariables>(
    LISTEN_CALL,
    { variables: { userId: user?.id as number }, skip: !user?.id }
  );
  const [callHandle] = useMutation<
    HandleCallMutation,
    HandleCallMutationVariables
  >(HANDLE_CALL);
  const [openCaller, setOpenCaller] = useState<boolean>(false);

  useEffect(() => {
    if (listenCall) {
      setOpenCaller(true);
    }
  }, [listenCall]);

  useEffect(() => {
    const handleTabClose = async () => {
      if (user) {
        await exec({ variables: { status: false, userId: user.id } });
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, [user]);

  const answerCall = async (status: boolean, userId: number) => {
    if (!listenCall) return;
    await callHandle({
      variables: {
        userId,
        status,
        token: listenCall.listenCall.token,
      },
    });
    if (status) {
      const url =
        import.meta.env.VITE_CLIENT_URI +
        `/call?token=${listenCall.listenCall.token}`;
      window.open(
        url,
        "_blank",
        `width=${window.screen.width}, height=${window.screen.height}`
      );
    }
    setOpenCaller(false);
  };

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
          {listenCall && user && (
            <ListenCallModal
              user={user}
              call={listenCall.listenCall}
              open={openCaller}
              handleCall={answerCall}
              onClose={() => setOpenCaller(false)}
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
