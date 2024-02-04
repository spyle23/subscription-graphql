import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { extractColorFromGradient } from "../../../utils/theme";
import { CustomIcon } from "../../../components/CustomIcon/CustomIcon";
import { DiscussionPopover } from "../../../components/popover/DiscussionPopover";
import { MessageGlobalApp } from "../../../types/message";

type HeaderMessageProps = {
  discussion: MessageGlobalApp;
  handleBack: () => void;
};

export const HeaderMessage: FC<HeaderMessageProps> = ({
  discussion,
  handleBack,
}) => {
  const { theme, userDiscuss } = discussion;
  const colorIcons = extractColorFromGradient(theme);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "inherit", svg: { fill: "inherit" } }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton sx={{ mr: 2 }} onClick={handleBack}>
                {colorIcons ? (
                  <CustomIcon
                    color1={colorIcons[0]}
                    color2={colorIcons[1]}
                    type={
                      theme.split("-")[0] === "linear" ? "linear" : "radial"
                    }
                    id={`ArrowBackIcon`}
                  >
                    <ArrowBackIcon sx={{ fill: `url(#ArrowBackIcon)` }} />
                  </CustomIcon>
                ) : (
                  <ArrowBackIcon sx={{ fill: theme }} />
                )}
              </IconButton>
              <DynamicAvatar sx={{ mr: 2 }} user={userDiscuss} />
              <Typography variant="h4">
                {"groupName" in userDiscuss
                  ? userDiscuss.groupName
                  : `${userDiscuss.firstname} ${userDiscuss.lastname}`}
              </Typography>
            </Box>
            <DiscussionPopover
              colorIcons={colorIcons}
              theme={theme}
              currentDiscussion={discussion}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
