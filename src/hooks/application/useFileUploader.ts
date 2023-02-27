import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { SnackbarContext } from "../../contexts";
import { Upload, UploadVariables, UPLOAD_FILE } from "../../graphql/file";
import { UploadInput } from "../../types/graphql-types";

export const useFileUploader = () => {
  const snackbarContext = useContext(SnackbarContext);
  const [uploadExec, { loading: uploadLoading, error: uploadError }] =
    useMutation<Upload, UploadVariables>(UPLOAD_FILE);
  const uploadFile = async (data: UploadInput): Promise<string | undefined> => {
    try {
      const fileData = await uploadExec({
        variables: {
          data,
        },
      });
      if (fileData.data?.upload) {
        return fileData.data?.upload;
      }
      return undefined;
    } catch (error) {
      snackbarContext.dispatchSnack({
        open: true,
        message: "Erreur d'enregistrement de fichier !",
        severity: "error",
      });
      return undefined;
    }
  };

  return {
    uploadError: uploadError?.message,
    uploadLoading,
    uploadFile,
  };
};
