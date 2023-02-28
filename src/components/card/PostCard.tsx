import {
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { GetOrderPost_getOrderPost } from "../../graphql/post/types/GetOrderPost";
import { HeadCard } from "../form/headCard/HeadCard";

type PostCardProps = {
  post: GetOrderPost_getOrderPost;
} & CardProps;

export const PostCard: FC<PostCardProps> = ({ post, ...cardProps }) => {
  return (
    <Card elevation={1} {...cardProps}>
      <CardHeader component={HeadCard}></CardHeader>
      <CardContent>
        <Typography>{post.description}</Typography>
        {post.image && (
          <img src={post.image} alt="post_image" style={{ width: "100%" }} />
        )}
      </CardContent>
    </Card>
  );
};
