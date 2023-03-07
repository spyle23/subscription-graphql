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
import { HeadCard } from "../form/headCard/HeadCard";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { CommentContainer } from "../comments/CommentContainer";

type PostCardProps = {
  post: GetOrderPost_getOrderPost;
} & CardProps;

export const PostCard: FC<PostCardProps> = ({ post, ...cardProps }) => {
  const [showComment, setShowComment] = useState<boolean>(false);
  const handleToggleComment = () => {
    setShowComment((curr) => !curr);
  };
  return (
    <Box>
      <Card elevation={1} {...cardProps}>
        <CardHeader component={HeadCard}></CardHeader>
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
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <IconButton>
                <ThumbUpIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <IconButton onClick={handleToggleComment}>
                <CommentIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      {showComment && <CommentContainer />}
    </Box>
  );
};
