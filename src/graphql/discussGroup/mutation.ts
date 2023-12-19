import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation CreateDiscussGroup(
    $userId: Float!
    $userChoose: UserChoose!
    $data: DiscussGroupInput!
  ) {
    createDiscussGroup(userId: $userId, userChoose: $userChoose, data: $data) {
      groupName
      coverPhoto
      id
      Discussion {
        id
        theme
        userId
      }
    }
  }
`;
