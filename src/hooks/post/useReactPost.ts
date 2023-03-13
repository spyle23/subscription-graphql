import { useMutation } from "@apollo/client";
import { REACT } from "../../graphql/react";
import {
  AddReaction,
  AddReactionVariables,
} from "../../graphql/react/types/AddReaction";
import { ReactionInput } from "../../types/graphql-types";

export const useReactPost = () => {
  const [addExec, { error }] = useMutation<AddReaction, AddReactionVariables>(
    REACT
  );

  const addReact = async (
    postId: number,
    userId: number,
    reactionType: ReactionInput
  ) => {
    await addExec({
      variables: {
        postId,
        userId,
        reactionType,
      },
    });
  };

  return {
    addReact,
  };
};
