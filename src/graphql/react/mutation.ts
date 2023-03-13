import { gql } from "@apollo/client";

export const REACT = gql`
  mutation AddReaction(
    $reactionType: ReactionInput!
    $userId: Float!
    $postId: Float!
  ) {
    addReaction(reactionType: $reactionType, userId: $userId, postId: $postId)
  }
`;
