import { FC } from "react";
import { Box, Card, CardProps, Typography, useTheme } from "@mui/material";
import { login_login_data } from "../../../graphql/user";
import { DynamicAvatar } from "../../../components/Avatar/DynamicAvatar";
import { MessageToUser_messageToUser, MessageTwoUser_messageTwoUser } from "../../../graphql/message";

type MessageItemProps = {
  user?: login_login_data;
  message: MessageTwoUser_messageTwoUser | MessageToUser_messageToUser;
} & CardProps;

export const MessageItem: FC<MessageItemProps> = ({
  user,
  message,
  sx,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        my: 2,
        justifyContent: user?.id === message.User.id ? "end" : "startf",
      }}
    >
      <Box sx={{ display: "flex" }}>
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
            backgroundColor:
              user?.id === message.User.id
                ? theme.palette.primary.main
                : "inherit",
            ...sx,
          }}
        >
          <Typography
            sx={{ color: user?.id === message.User.id ? "white" : "black" }}
          >
            {message.content}
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};
