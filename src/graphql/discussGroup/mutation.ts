import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation CreateDiscussGroup(
    $userChoose: UserChoose!
    $data: DiscussGroupInput!
  ) {
    createDiscussGroup(userChoose: $userChoose, data: $data) {
      id
      groupName
      coverPhoto
      createdAt
      updatedAt
    }
  }
`;
