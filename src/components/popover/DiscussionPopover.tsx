import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  useTheme,
} from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import VideocamIcon from "@mui/icons-material/Videocam";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { FC, useState } from "react";
import { MessageGlobalApp } from "../../types/message";
import { ThemeModal } from "../modal/ThemeModal";
import { CustomIcon } from "../CustomIcon/CustomIcon";
import { useMutation } from "@apollo/client";
import {
  CallUser,
  CallUserVariables,
} from "../../graphql/videoCall/types/CallUser";
import { CALL_USER } from "../../graphql/videoCall";
import { useApplicationContext } from "../../hooks";
import { useNavigate } from "react-router-dom";

type DiscussionPopoverProps = {
  theme: string;
  colorIcons: string[] | null;
  currentDiscussion: MessageGlobalApp;
};

export const DiscussionPopover: FC<DiscussionPopoverProps> = ({
  theme,
  colorIcons,
  currentDiscussion,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { user } = useApplicationContext();
  const [changeTheme, setChangeTheme] = useState(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const id = open ? "discussion-popover" : undefined;
  const [exec] = useMutation<CallUser, CallUserVariables>(CALL_USER);
  const callUser = async (discussionId: number) => {
    if (!user) return null;
    const { data } = await exec({
      variables: { discussionId, userId: user.id },
    });
    if (data) {
      const url =
        import.meta.env.VITE_CLIENT_URI + `/call?token=${data.callUser}`;
      window.open(
        url,
        "_blank",
        `width=${window.screen.width}, height=${window.screen.height}`
      );
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };
  const openChangeTheme = () => {
    setChangeTheme(true);
    setAnchorEl(null);
  };
  const handleCloseTheme = () => {
    setChangeTheme(false);
  };
  return (
    <div>
      <IconButton
        aria-label="show discussion settings"
        color="inherit"
        onClick={handleClick}
      >
        {colorIcons ? (
          <CustomIcon
            color1={colorIcons[0]}
            color2={colorIcons[1]}
            type={theme.split("-")[0] === "linear" ? "linear" : "radial"}
            id={`KeyboardArrowDownIcon`}
          >
            <KeyboardArrowDownIcon
              sx={{ fill: `url(#KeyboardArrowDownIcon)` }}
            />
          </CustomIcon>
        ) : (
          <KeyboardArrowDownIcon sx={{ fill: theme }} />
        )}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ style: { minWidth: 300 } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={openChangeTheme}>
            <ListItemIcon>
              {colorIcons ? (
                <CustomIcon
                  color1={colorIcons[0]}
                  color2={colorIcons[1]}
                  type={theme.split("-")[0] === "linear" ? "linear" : "radial"}
                  id={`AdjustIcon`}
                >
                  <AdjustIcon sx={{ fill: `url(#AdjustIcon)` }} />
                </CustomIcon>
              ) : (
                <AdjustIcon sx={{ fill: theme }} />
              )}
            </ListItemIcon>
            <ListItemText primary="Modifier le thème" />
          </ListItemButton>
          <ListItemButton onClick={() => callUser(currentDiscussion.id)}>
            <ListItemIcon>
              {colorIcons ? (
                <CustomIcon
                  color1={colorIcons[0]}
                  color2={colorIcons[1]}
                  type={theme.split("-")[0] === "linear" ? "linear" : "radial"}
                  id={`VideocamIcon`}
                >
                  <VideocamIcon sx={{ fill: `url(#VideocamIcon)` }} />
                </CustomIcon>
              ) : (
                <VideocamIcon sx={{ fill: theme }} />
              )}
            </ListItemIcon>
            <ListItemText primary="Appel vidéo" />
          </ListItemButton>
          {"firstname" in currentDiscussion.userDiscuss && (
            <ListItemButton
              onClick={() =>
                navigate(
                  `/landing/profil/${currentDiscussion.userDiscuss.id}`
                )
              }
            >
              <ListItemIcon>
                {colorIcons ? (
                  <CustomIcon
                    color1={colorIcons[0]}
                    color2={colorIcons[1]}
                    type={
                      theme.split("-")[0] === "linear" ? "linear" : "radial"
                    }
                    id={`AccountBoxIcon`}
                  >
                    <AccountBoxIcon sx={{ fill: `url(#AccountBoxIcon)` }} />
                  </CustomIcon>
                ) : (
                  <AccountBoxIcon sx={{ fill: theme }} />
                )}
              </ListItemIcon>
              <ListItemText primary="Voir le profil" />
            </ListItemButton>
          )}
        </List>
      </Popover>
      <ThemeModal
        open={changeTheme}
        onClose={handleCloseTheme}
        discussion={currentDiscussion}
      />
    </div>
  );
};
