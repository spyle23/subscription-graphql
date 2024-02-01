import React, { FC, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  styled,
  Toolbar,
  alpha,
  Badge,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import { REQUEST_NOTIF } from "../../graphql/friendRequest/subscription";
import {
  SendRequestNotif,
  SendRequestNotifVariables,
} from "../../graphql/friendRequest/types/SendRequestNotif";
import { useApplicationContext } from "../../hooks";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

type DashboardNavbarProps = {
  notification: React.ReactNode;
  utilisateur: React.ReactNode;
  message: React.ReactNode;
};

export const DashboardNavbar: FC<DashboardNavbarProps> = ({
  notification,
  message,
  utilisateur,
}): JSX.Element => {
  const navigate = useNavigate();
  const { user } = useApplicationContext();
  const { data } = useSubscription<SendRequestNotif, SendRequestNotifVariables>(
    REQUEST_NOTIF,
    { variables: { userId: user?.id as number }, skip: !user?.id }
  );
  const [nbrInvit, setNbrInvit] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setNbrInvit((curr) => curr + 1);
    }
  }, [data]);
  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2,
        }}
      >
        <IconButton size="large" aria-label="logo" color="inherit">
          <FacebookOutlinedIcon />
        </IconButton>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            aria-label="home icon"
            color="inherit"
            onClick={() => navigate("/landing")}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="invitations"
            color="inherit"
            onClick={() => {
              setNbrInvit(0);
              navigate("/landing/friend-requests");
            }}
          >
            <Badge badgeContent={nbrInvit} color="error">
              <GroupIcon />
            </Badge>
          </IconButton>
          {message}
          {notification}
          {utilisateur}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
