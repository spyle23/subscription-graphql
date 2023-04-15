import { AppBar, Avatar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import {
  MessagesOfCurrentUser_messagesOfCurrentUser_Receiver,
  MessagesOfCurrentUser_messagesOfCurrentUser_User,
  MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup,
} from "../../../graphql/message/types/MessagesOfCurrentUser";

type HeaderMessageProps = {
  data?:
    | MessagesOfCurrentUser_messagesOfCurrentUser_User
    | MessagesOfCurrentUser_messagesOfCurrentUser_Receiver | null;
  group?: MessagesOfCurrentUser_messagesOfCurrentUser_DiscussGroup | null;
};

export const HeaderMessage: FC<HeaderMessageProps> = ({ data, group }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "inherit", svg: { fill: "inherit" } }}
      >
        <Toolbar>
          <Box sx={{ display: "flex" }}>
            { data ?  <DynamicAvatar user={data} /> : <Avatar sx={{ mr: 2 }} src={ group?.coverPhoto || "" } />}
            <Typography variant="h4">
              {data ? data.firstname + " "+ data.lastname : group?.groupName}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
