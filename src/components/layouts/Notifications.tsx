import { useLazyQuery, useQuery, useSubscription } from "@apollo/client";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, IconButton, Popover, Typography, Box } from "@mui/material";
import moment from "moment";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { POST_SUBSCRIPTION } from "../../graphql/notification/subscription";
import {
  CommentPost,
  CommentPostVariables,
  CommentPost_commentPost,
} from "../../graphql/notification/types/CommentPost";
import { useApplicationContext } from "../../hooks";
import addNotification from "react-push-notification";
import { GET_NOTIFICATIONS } from "../../graphql/notification/query";
import {
  GetNotifications,
  GetNotificationsVariables,
} from "../../graphql/notification/types/GetNotifications";
import { Waypoint } from "react-waypoint";
import emptyNotification from "../../assets/empty_notifications.png";
import { NotificationSkeleton } from "../skeleton/MessageSkeleton";

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
  const { data } = useSubscription<CommentPost, CommentPostVariables>(
    POST_SUBSCRIPTION,
    {
      variables: { userId: user?.id as number },
    }
  );

  const [executeQuery, { data: listNotifications, loading, fetchMore }] =
    useLazyQuery<GetNotifications, GetNotificationsVariables>(
      GET_NOTIFICATIONS,
      {
        variables: { userId: user?.id as number, cursor: null },
        notifyOnNetworkStatusChange: true,
      }
    );

  console.log("listNotifications", listNotifications?.getNotifications);

  const finaleNotifications = useMemo<NotificationType>(() => {
    if (listNotifications?.getNotifications) {
      return {
        ...notifications,
        notifications: [
          ...notifications.notifications,
          ...listNotifications.getNotifications,
        ],
      };
    }
    return notifications;
  }, [listNotifications, notifications]);

  useEffect(() => {
    if (data) {
      dispatch((prev) => ({
        nbrNotification: prev.nbrNotification + 1,
        notifications: [data.commentPost, ...prev.notifications],
      }));
      dispatchSnack({
        open: true,
        message: data.commentPost.name,
        severity: "info",
      });
      addNotification({
        title: `${data.commentPost.name}`,
        message: `${data.commentPost.description}`,
        native: true,
      });
    }
  }, [data]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) return;
    if (!listNotifications?.getNotifications) {
      executeQuery({ variables: { userId: user.id, cursor: null } });
    }
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
        <Badge badgeContent={finaleNotifications.nbrNotification} color="error">
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
        <Box sx={{ p: 2, width: { xs: "250px", md: "250px" } }}>
          {!loading && finaleNotifications.notifications.length === 0 && (
            <Box>
              <Typography sx={{ textAlign: "center" }}>
                Aucune notification
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box
                  component="img"
                  src={emptyNotification}
                  sx={{ width: "150px" }}
                />
              </Box>
            </Box>
          )}
          {finaleNotifications.notifications.map((notification, index) => {
            return (
              <Fragment key={index}>
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="h5">{notification.name}</Typography>
                  <Typography component="p">
                    {notification.description} le{" "}
                    {moment(notification.createdAt).format(
                      "DD MMM YYYY à HH:mm:ss"
                    )}
                  </Typography>
                </Box>
                {index === finaleNotifications.notifications.length - 1 &&
                  finaleNotifications.notifications.length === 10 && (
                    <Waypoint
                      onEnter={() =>
                        fetchMore({
                          variables: {
                            cursor:
                              finaleNotifications.notifications[
                                finaleNotifications.notifications.length - 1
                              ].id,
                          },
                          updateQuery(
                            previousQueryResult,
                            { fetchMoreResult }
                          ) {
                            if (!fetchMoreResult) return previousQueryResult;
                            return {
                              getNotifications: [
                                ...previousQueryResult.getNotifications,
                                ...fetchMoreResult.getNotifications,
                              ],
                            };
                          },
                        })
                      }
                    />
                  )}
              </Fragment>
            );
          })}
          {loading &&
            [1, 2, 3].map((val) => <NotificationSkeleton key={val} />)}
        </Box>
      </Popover>
    </div>
  );
};
