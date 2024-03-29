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
} from "@mui/material";
import { FC, useState, useMemo, MouseEvent } from "react";
import { GetOrderPost_getOrderPost } from "../../graphql/post/types/GetOrderPost";
import CommentIcon from "@mui/icons-material/Comment";
import { CommentContainer } from "../comments/CommentContainer";
import moment from "moment";
import { ReactionInput, ReactionType } from "../../types/graphql-types";
import { login_login_data } from "../../graphql/user";
import { FBReactions } from "../comments/FBReactions";
import LikeIcon from "../../assets/likeicon.png";
import { motion } from "framer-motion";
import { IReactions } from "../../types/IReactions";
import { reactions } from "../../constants/reactions";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import { ContainerDisplay } from "../media/ContainerDisplay";
import { useNavigate } from "react-router-dom";

type PostCardProps = {
  post: GetOrderPost_getOrderPost;
  user?: login_login_data;
  addReact: (postId: number, reactionType: ReactionInput) => Promise<void>;
} & CardProps;

const findUrlByReaction = (value: ReactionType): string | undefined => {
  const val = reactions.find((item) => item.value === value);
  return val?.url;
};

export const PostCard: FC<PostCardProps> = ({
  post,
  user,
  addReact,
  onMouseLeave,
  ...cardProps
}) => {
  const [showComment, setShowComment] = useState<boolean>(false);
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const userReact = useMemo(
    () => post?.reactions?.find((react) => react.userId === user?.id),
    [post, user]
  );
  const [reaction, setReaction] = useState<IReactions>({
    url: userReact ? findUrlByReaction(userReact.reactionType) : undefined,
    value: userReact?.reactionType,
  });
  const handleToggleComment = () => {
    setShowComment((curr) => !curr);
  };

  const handleReact = async (value: IReactions) => {
    if (!value.value) return;
    setReaction((prev) => {
      if (prev.value === value.value) {
        return {
          url: undefined,
          value: undefined,
        } as IReactions;
      }
      return value;
    });
    await addReact(post?.id, { reactionType: value.value });
  };

  const displayName = useMemo(() => {
    const name =
      user?.id === post?.user?.id
        ? "Vous"
        : post?.user?.firstname + " " + post?.user?.lastname;
    return name;
  }, [user, post]);

  const handleLeave = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    onMouseLeave && onMouseLeave(e);
    setShow(false);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Card elevation={1} {...cardProps} onMouseLeave={handleLeave}>
        <CardHeader
          avatar={<DynamicAvatar user={post.user} />}
          title={
            <>
              <Typography
                onClick={() => navigate(`/landing/profil/${post.user.id}`)}
                variant="h5"
                sx={{ cursor: "pointer" }}
              >
                {displayName}
              </Typography>
              <Typography>
                {moment(new Date(post?.updatedAt || post?.createdAt))
                  .startOf("second")
                  .fromNow()}
              </Typography>
            </>
          }
        ></CardHeader>
        <CardContent>
          <Typography>{post.description}</Typography>
          <ContainerDisplay data={post.files} />
        </CardContent>
        <FBReactions btnClicked={show} onClick={handleReact} />
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
              <motion.button
                // whileHover={{ scale: 1.2 }}
                className="likeBtn"
                style={{ background: "transparent" }}
                onMouseEnter={() => setShow(true)}
              >
                <motion.img
                  src={reaction?.url || LikeIcon}
                  width={reaction?.url ? "27" : "15"}
                />
              </motion.button>
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
              <Typography>{post.nbComments}</Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      {showComment && <CommentContainer idPost={post.id} />}
    </Box>
  );
};
