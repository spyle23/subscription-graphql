import { FC } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardProps,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import { MessageGlobalApp } from "../../types/message";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";
import { MessageItem } from "../../pages/Message/components/MessageItem";
import { login_login_data } from "../../graphql/user";
import CollectionsIcon from "@mui/icons-material/Collections";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type DiscussionCardProps = {
  discussion: MessageGlobalApp;
  user?: login_login_data;
} & CardProps;

export const DiscussionCard: FC<DiscussionCardProps> = ({
  discussion,
  user,
  ...cardProps
}) => {
  const theme = useTheme();
  return (
    <Card {...cardProps}>
      <CardHeader
        avatar={
          discussion.userDiscuss ? (
            <DynamicAvatar sx={{ mr: 0 }} user={discussion.userDiscuss} />
          ) : (
            <Avatar src={discussion.DiscussGroup?.coverPhoto || ""} />
          )
        }
        title={
          discussion.userDiscuss
            ? `${discussion.userDiscuss.firstname} ${discussion.userDiscuss.lastname}`
            : discussion.DiscussGroup?.groupName
        }
        action={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <IconButton>
              <MinimizeIcon />
            </IconButton>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Box>
        }
      />
      <CardContent sx={{ height: "350px", overflowY: "auto" }}>
        {discussion.messages.map((message) => (
          <MessageItem key={message.id} message={message} user={user} />
        ))}
      </CardContent>
      <CardActions>
        <form
          style={{ display: "flex", width: "100%" }}
          // onSubmit={handleSubmit(sendMessage)}
        >
          <div>
            <IconButton>
              <CollectionsIcon sx={{ fill: theme.palette.primary.main }} />
            </IconButton>
          </div>
          <TextField
            // {...register("content")}
            InputProps={{
              sx: {
                borderRadius: "25px !important",
              },
            }}
            placeholder="votre message ..."
            sx={{ width: "80%" }}
          />
          <IconButton type="submit">
            <PlayArrowIcon sx={{ fill: theme.palette.primary.main }} />
          </IconButton>
        </form>
      </CardActions>
    </Card>
  );
};
