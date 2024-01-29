import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation Upload($data: [Upload!]!) {
    upload(data: $data) {
      name
      url
      extension
    }
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($url: String!) {
    deleteFile(url: $url)
  }
`;
