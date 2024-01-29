import React, { FC } from "react";
import { useApplicationContext } from "../../hooks/application/useApplicationContext";
import {
  Badge,
  IconButton,
  Popover,
  Typography,
  Box,
  List,
  ListSubheader,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export const UserMenu: FC = (): JSX.Element => {
  const { user, logout } = useApplicationContext();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  if (!user) return <></>;
  return (
    <div>
      <IconButton
        aria-label="show user menu"
        color="inherit"
        edge="end"
        onClick={handleClick}
      >
        <DynamicAvatar user={user} />
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
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2 }}>
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader id="nested-list-subheader">
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="subtitle1">
                    {user?.firstname + " " + user?.lastname}
                  </Typography>
                </Box>
              </ListSubheader>
            }
          >
            <Divider />
            <ListItemButton
              onClick={() =>
                navigate(`/subscription-graphql/landing/profil/${user.id}`)
              }
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Voir le profile" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                logout();
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Se déconnecter" />
            </ListItemButton>
          </List>
        </Box>
      </Popover>
    </div>
  );
};
