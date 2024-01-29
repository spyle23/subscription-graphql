import { useQuery } from "@apollo/client";
import { POST_ORDER } from "../../graphql/post";
import {
  GetOrderPost,
  GetOrderPostVariables,
} from "../../graphql/post/types/GetOrderPost";

export const usePost = () => {
  const {
    data: allPost,
    loading: postLoading,
    refetch,
    fetchMore,
    error: postError,
    networkStatus,
  } = useQuery<GetOrderPost, GetOrderPostVariables>(POST_ORDER, {
    variables: { cursor: null },
    notifyOnNetworkStatusChange: true,
  });

  return {
    allPost,
    postLoading,
    fetchMore,
    networkStatus,
    postError,
    refetch,
  };
};
