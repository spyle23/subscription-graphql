import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import {
  MessagesOfCurrentUser_messagesOfCurrentUser_Receiver,
  MessagesOfCurrentUser_messagesOfCurrentUser_User,
} from "../../../graphql/message/types/MessagesOfCurrentUser";

type HeaderMessageProps = {
  data?:
    | MessagesOfCurrentUser_messagesOfCurrentUser_User
    | MessagesOfCurrentUser_messagesOfCurrentUser_Receiver;
};

export const HeaderMessage: FC<HeaderMessageProps> = ({ data }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "inherit", "svg": { fill: "inherit" } }} >
        <Toolbar>
          <Box sx={{ display: "flex" }}>
            <DynamicAvatar user={data} />
            <Typography variant="h4">
              {data?.firstname + " " + data?.lastname}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
