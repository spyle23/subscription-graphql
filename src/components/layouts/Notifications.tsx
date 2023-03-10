import { useSubscription } from "@apollo/client";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton, Popover, Typography, Box } from "@mui/material";
import moment from "moment";
import React, { useMemo } from "react";
import { POST_SUBSCRIPTION } from "../../graphql/notification/subscription";
import {
  CommentPost,
  CommentPostVariables,
  CommentPost_commentPost,
} from "../../graphql/notification/types/CommentPost";
import { useApplicationContext } from "../../hooks";

type NotificationType = {
  nbrNotification: number;
  notifications: CommentPost_commentPost[];
};

export const Notifications = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const { user } = useApplicationContext();
  const { data, loading, error } = useSubscription<
    CommentPost,
    CommentPostVariables
  >(POST_SUBSCRIPTION, {
    variables: { userId: user?.id as number }
  });

  console.log(error?.message)

  const notifications: NotificationType = useMemo(() => {
    let notifications: CommentPost_commentPost[] = [];
    let nbrNotification: number = 0;
    if (data) {
      nbrNotification += 1;
      notifications.push(data.commentPost);
    }
    return {
      notifications,
      nbrNotification,
    };
  }, [data]);

  // useEffect(() => {
  //   if (data) {
  //     setNotifications((prev) => [...prev, data])
  //     setNbrNewNotif((prev) => prev + 1)
  //   }
  // }, [data])

  // useEffect(() => {
  //   if (business?.Notification) {
  //     const notificationsData =
  //       business?.Notification && business?.Notification?.length > 5
  //         ? business?.Notification?.slice(0,4)
  //         : business?.Notification
  //     setNotifications([...notificationsData])
  //   }
  // }, [business?.Notification])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
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
                    "DD MMM YYYY à HH:mm:ss"
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
