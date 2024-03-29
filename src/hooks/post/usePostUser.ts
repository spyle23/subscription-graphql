import { useMutation, useQuery } from "@apollo/client";
import {
  CreatePost,
  CreatePostVariables,
  CREATE_POST,
  PostByUser,
  PostByUserVariables,
  POST_BY_USER,
} from "../../graphql/post";
import { PostInput } from "../../types/graphql-types";
import { useApplicationContext } from "../application";

export const usePostUser = () => {
  const { user } = useApplicationContext();
  const { data, loading, error } = useQuery<PostByUser, PostByUserVariables>(
    POST_BY_USER,
    { variables: { userId: user?.id as number }, skip: !user?.id }
  );
  const [createExec] = useMutation<CreatePost, CreatePostVariables>(
    CREATE_POST
  );

  const createPost = async (data: PostInput, userId: number) => {
    const newData: PostInput = data.files ? data : { ...data, files: [] };
    const message = await createExec({
      variables: {
        data: newData,
        userId,
      },
    });
    return message;
  };

  return {
    data,
    loading,
    error,
    createPost,
  };
};
