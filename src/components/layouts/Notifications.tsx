import { useSubscription } from "@apollo/client";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton, Popover, Typography, Box } from "@mui/material";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { POST_SUBSCRIPTION } from "../../graphql/notification/subscription";
import {
  CommentPost,
  CommentPostVariables,
  CommentPost_commentPost,
} from "../../graphql/notification/types/CommentPost";
import { useApplicationContext } from "../../hooks";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";

type NotificationType = {
  nbrNotification: number;
  notifications: CommentPost_commentPost[];
};

const initialValue: NotificationType = {
  nbrNotification: 0,
  notifications: [],
};

export const Notifications = (): JSX.Element => {
  const [notifications, dispatch] = useState<NotificationType>(initialValue);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const { user, dispatchSnack } = useApplicationContext();
  const { data: userProfile } = useCurrentUser(user?.id as number);
  const { data, loading, error } = useSubscription<
    CommentPost,
    CommentPostVariables
  >(POST_SUBSCRIPTION, {
    variables: { userId: user?.id as number },
  });

  useEffect(() => {
    if (data) {
      dispatch((prev) => ({
        nbrNotification: prev.nbrNotification + 1,
        notifications: [...prev.notifications, data.commentPost],
      }));
      dispatchSnack({
        open: true,
        message: data.commentPost.name,
        severity: "info",
      });
    }
  }, [data]);

  useEffect(() => {
    if (userProfile?.profile?.notifications) {
      const notificationsData =
        userProfile?.profile?.notifications.length > 5
          ? userProfile?.profile?.notifications.slice(0, 4)
          : userProfile?.profile?.notifications;
      dispatch((prev) => ({ ...prev, notifications: notificationsData }));
    }
  }, [userProfile]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    dispatch((prev) => ({ ...prev, nbrNotification: 0 }));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        onClick={handleClick}
      >
        <Badge badgeContent={notifications.nbrNotification} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2 }}>
          {notifications.notifications.map((notification, index) => {
            return (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography variant="h5">{notification.name}</Typography>
                <Typography component="p">
                  {notification.description} le{" "}
                  {moment(notification.createdAt).format(
                    "DD MMM YYYY ?? HH:mm:ss"
                  )}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Popover>
    </div>
  );
};
