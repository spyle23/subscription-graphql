import { useMutation } from "@apollo/client";
import { DELETE_FILE } from "../../graphql/file";
import {
  DeleteFile,
  DeleteFileVariables,
} from "../../graphql/file/types/DeleteFile";

export const useFileDeleter = () => {
  const [deleteExec] = useMutation<DeleteFile, DeleteFileVariables>(
    DELETE_FILE
  );
  const deleteFile = async (url: string) => {
    const message = await deleteExec({
      variables: {
        url,
      },
    });
    return message;
  };
  return {
    deleteFile,
  };
};
