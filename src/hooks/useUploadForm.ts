import { useForm, UseFormReturn } from "react-hook-form";
import { FileInput } from "../types/graphql-types";
import { Upload_upload } from "../graphql/file";
import { useFileDeleter } from "./application/useFileDeleter";

export type UseUploadFormReturn<T extends { files: FileInput[] }> = {
  onFinished: (data: Upload_upload[]) => void;
  dropFile: (data: FileInput) => Promise<void>;
} & UseFormReturn<T, any>;

/**
 * use this hook to use the form and upload logic
 * this hook return the finish upload method and the delete file method and all of useForm return 
 * @returns 
 */
export const useUploadForm = <
  T extends { files: FileInput[] }
>(): UseUploadFormReturn<T> => {
  const {
    register,
    formState,
    handleSubmit,
    reset,
    getValues,
    watch,
    ...other
  } = useForm<T>();
  const { deleteFile } = useFileDeleter();
  const onFinished = (data: Upload_upload[]) => {
    const currentValues = getValues();
    reset({ ...currentValues, files: [...currentValues.files, ...data] });
  };
  const dropFile = async (data: FileInput) => {
    const currentValues = getValues();
    await deleteFile(data.url);
    reset({
      ...currentValues,
      files: currentValues.files.filter((i) => i.url !== data.url),
    });
  };

  return {
    dropFile,
    onFinished,
    register,
    watch,
    handleSubmit,
    reset,
    getValues,
    formState,
    ...other,
  };
};
