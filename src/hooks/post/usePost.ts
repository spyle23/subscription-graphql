import { useQuery } from "@apollo/client";
import { POST_ORDER } from "../../graphql/post";
import { GetOrderPost } from "../../graphql/post/types/GetOrderPost";

export const usePost = () => {
  const {
    data: allPost,
    loading: postLoading,
    error: postError,
  } = useQuery<GetOrderPost>(POST_ORDER);

  return {
    allPost,
    postLoading,
    postError,
  };
};
