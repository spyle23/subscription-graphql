import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardProps,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useState, useMemo } from "react";
import { GetOrderPost_getOrderPost } from "../../graphql/post/types/GetOrderPost";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CommentContainer } from "../comments/CommentContainer";
import moment from "moment";
import { ReactionInput, ReactionType } from "../../types/graphql-types";
import { login_login_data } from "../../graphql/user";

type PostCardProps = {
  post: GetOrderPost_getOrderPost;
  user?: login_login_data;
  addReact: (postId: number, reactionType: ReactionInput) => Promise<void>;
} & CardProps;

export const PostCard: FC<PostCardProps> = ({
  post,
  user,
  addReact,
  ...cardProps
}) => {
  const theme = useTheme();
  const [showComment, setShowComment] = useState<boolean>(false);
  const [reacted, setReacted] = useState<boolean>(
    post?.reactions?.find((react) => react.userId === user?.id) ? true : false
  );
  const handleToggleComment = () => {
    setShowComment((curr) => !curr);
  };

  const handleReact = async () => {
    setReacted((prev) => !prev);
    await addReact(post?.id, { reactionType: ReactionType.LIKE });
  };

  const displayName = useMemo(() => {
    const name =
      user?.id === post?.user?.id
        ? "Vous"
        : post?.user?.firstname + " " + post?.user?.lastname;
    return name;
  }, [user, post]);

  return (
    <Box>
      <Card elevation={1} {...cardProps}>
        <CardHeader
          avatar={<Avatar src={post?.user?.photo || ""} />}
          title={
            <>
              <Typography variant="h5">{displayName}</Typography>
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
          <Grid container sx={{ position: "relative" }}>
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
                <ThumbUpIcon
                  sx={{ fill: reacted ? "#512da8" : "currentcolor" }}
                />
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
