import { FC } from "react";
import { Box, Card, CardProps, IconButton, Typography } from "@mui/material";
import { login_login_data } from "../../../graphql/user";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import { MessageTwoUser_messageTwoUser } from "../../../graphql/message";
import { ContainerDisplay } from "../../../components/media/ContainerDisplay";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type MessageItemProps = {
  user?: login_login_data;
  theme: string;
  message: MessageTwoUser_messageTwoUser;
} & CardProps;

export const MessageItem: FC<MessageItemProps> = ({
  user,
  theme,
  message,
  sx,
  ...props
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        my: 2,
        justifyContent: user?.id === message.User.id ? "end" : "start",
        ":hover": {
          ".MuiIconButton-root": {
            display: "block",
          },
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {message.User.id === user?.id && (
          <IconButton sx={{ height: "max-content", display: "none" }}>
            <MoreVertIcon />
          </IconButton>
        )}
        <DynamicAvatar
          user={message.User}
          sx={{ display: user?.id === message.User.id ? "none" : "block" }}
        />
        <Card
          elevation={1}
          {...props}
          sx={{
            borderRadius: "10px",
            p: 1,
            background: user?.id === message.User.id ? theme : "inherit",
            ...sx,
          }}
        >
          <Typography
            sx={{ color: user?.id === message.User.id ? "white" : "black" }}
          >
            {message.content}
          </Typography>
          <ContainerDisplay data={message.files} />
        </Card>
        {message.User.id !== user?.id && (
          <IconButton sx={{ height: "max-content", display: "none" }}>
            <MoreVertIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};
