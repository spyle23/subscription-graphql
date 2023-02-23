import { useQuery } from "@apollo/client";
import {
  PostByUser,
  PostByUserVariables,
  POST_BY_USER,
} from "../../graphql/post";
import { useApplicationContext } from "../application";

export const usePost = () => {
  const { user } = useApplicationContext();
  const { data, loading, error } = useQuery<PostByUser, PostByUserVariables>(
    POST_BY_USER,
    { variables: { userId: user?.id as number } }
  );

  return {
    data,
    loading,
    error,
  };
};
