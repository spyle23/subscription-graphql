import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($data: PostInput!, $userId: Float!) {
    createPost(data: $data, userId: $userId)
  }
`;
