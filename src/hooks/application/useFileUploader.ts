import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { SnackbarContext } from "../../contexts";
import {
  Upload,
  UploadVariables,
  UPLOAD_FILE,
  Upload_upload,
} from "../../graphql/file";

export const useFileUploader = () => {
  const snackbarContext = useContext(SnackbarContext);
  const [uploadExec, { loading: uploadLoading, error: uploadError }] =
    useMutation<Upload, UploadVariables>(UPLOAD_FILE);
  const uploadFile = async (
    data: any[]
  ): Promise<Upload_upload[] | undefined> => {
    try {
      const fileData = await uploadExec({
        variables: {
          data,
        },
      });
      return fileData.data?.upload;
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
