import { AccountCircle } from "@mui/icons-material";
import { Avatar, Box, Card, Typography } from "@mui/material";
import moment from "moment";
import { FC } from "react";
import { GetCommentByPost_getCommentByPost_data as IComment } from "../../graphql/comment/types/GetCommentByPost";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";

export const CommentPresenter: FC<IComment> = ({
  createdAt,
  updatedAt,
  content,
  image,
  User,
}) => {
  return (
    <Box sx={{ display: "flex", p: 2 }}>
      <DynamicAvatar user={User} sx={{ mr: 2 }} />
      <Card elevation={1} sx={{ px: 2, py: 1 }}>
        <Box>
          <Typography variant="h6" sx={{ fontSize: "1.2em" }}>
            {User?.firstname + " " + User?.lastname}
          </Typography>
          <Typography sx={{ fontSize: "0.7em" }}>
            {moment(new Date(updatedAt || createdAt))
              .startOf("hour")
              .fromNow()}
          </Typography>
        </Box>
        <Box>
          <Typography>{content}</Typography>
          {image && <img src={image} alt="image_comment" />}
        </Box>
      </Card>
    </Box>
  );
};
