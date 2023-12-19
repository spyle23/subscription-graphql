import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { FC } from "react";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import {
  MessagesOfCurrentUser_messagesOfCurrentUser_Receiver,
  MessagesOfCurrentUser_messagesOfCurrentUser_User,
  MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup,
} from "../../../graphql/message/types/MessagesOfCurrentUser";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type HeaderMessageProps = {
  data:
    | MessagesOfCurrentUser_messagesOfCurrentUser_User
    | MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup;
  handleBack: () => void;
};

export const HeaderMessage: FC<HeaderMessageProps> = ({ data, handleBack }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "inherit", svg: { fill: "inherit" } }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton sx={{ mr: 2 }} onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <DynamicAvatar sx={{ mr: 2 }} user={data} />
            <Typography variant="h4">
              {"groupName" in data
                ? data.groupName
                : `${data.firstname} ${data.lastname}`}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
