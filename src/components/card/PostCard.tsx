import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardProps,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { GetOrderPost_getOrderPost } from "../../graphql/post/types/GetOrderPost";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { CommentContainer } from "../comments/CommentContainer";
import { AccountCircle } from "@mui/icons-material";
import moment from "moment";
import { ReactionInput, ReactionType } from "../../types/graphql-types";

type PostCardProps = {
  post: GetOrderPost_getOrderPost;
  addReact: (postId: number, reactionType: ReactionInput) => Promise<void>;
} & CardProps;

export const PostCard: FC<PostCardProps> = ({
  post,
  addReact,
  ...cardProps
}) => {
  const [showComment, setShowComment] = useState<boolean>(false);
  const handleToggleComment = () => {
    setShowComment((curr) => !curr);
  };

  const handleReact = async () => {
    await addReact(post?.id, { reactionType: ReactionType.LIKE });
  };
  return (
    <Box>
      <Card elevation={1} {...cardProps}>
        <CardHeader
          avatar={post?.user?.photo || <AccountCircle />}
          title={
            <>
              <Typography variant="h5">
                {post?.user?.firstname + " " + post?.user?.lastname}
              </Typography>
              <Typography>
                {moment(new Date(post?.updatedAt || post?.createdAt))
                  .startOf("hour")
                  .fromNow()}
              </Typography>
            </>
          }
        ></CardHeader>
        <CardContent>
          <Typography>{post.description}</Typography>
          {post.image && (
            <img src={post.image} alt="post_image" style={{ width: "100%" }} />
          )}
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton onClick={handleReact}>
                <ThumbUpIcon />
              </IconButton>
              <Typography>{post.reactions?.length}</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton onClick={handleToggleComment}>
                <CommentIcon />
              </IconButton>
              <Typography>{post.comments?.length}</Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      {showComment && <CommentContainer idPost={post.id} />}
    </Box>
  );
};
