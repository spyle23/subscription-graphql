import { gql } from "@apollo/client";

export const UPLOAD_FILE = gql`
  mutation Upload($data: UploadInput!) {
    upload(data: $data)
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFile($url: String!) {
    deleteFile(url: $url)
  }
`;
