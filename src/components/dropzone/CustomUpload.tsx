import React, { FC, useCallback } from "react";
import { useFileUploader } from "../../hooks/application/useFileUploader";
import { useDropzone } from "react-dropzone";
import { Upload_upload } from "../../graphql/file";

type CustomUploadProps = {
  onFinished: (data: Upload_upload[]) => void;
  children: React.ReactNode;
};

export const CustomUpload: FC<CustomUploadProps> = ({
  onFinished,
  children,
}) => {
  const { uploadFile } = useFileUploader();
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const files = await uploadFile(acceptedFiles);
    onFinished(files ?? []);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
