import { gql } from "@apollo/client";

export const MESSAGE_TWO_USER = gql`
  query MessageTwoUser(
    $userId: Float!
    $receiverId: Float
    $discussGroupId: Float
  ) {
    messageTwoUser(
      userId: $userId
      receiverId: $receiverId
      discussGroupId: $discussGroupId
    ) {
      message
      data {
        id
        userId
        receiverId
        discussGroupId
        content
        createdAt
        updatedAt
      }
      success
    }
  }
`;
