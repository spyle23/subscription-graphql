import { useMutation } from "@apollo/client";
import {
  CREATE_GROUP,
  CreateDiscussGroup,
  CreateDiscussGroupVariables,
} from "../../graphql/discussGroup";
import { DiscussGroupInput, UserChoose } from "../../types/graphql-types";

export const useCreateGroup = () => {
  const [createExec, { loading, error, data }] = useMutation<
    CreateDiscussGroup,
    CreateDiscussGroupVariables
  >(CREATE_GROUP);

  const createGroup = async (
    data: DiscussGroupInput,
    userId: number,
    userChoose: UserChoose
  ) => {
    await createExec({
      variables: {
        data,
        userId,
        userChoose,
      },
    });
  };

  return {
    data,
    createGroup,
    loading,
    error: error?.message
  }
};
