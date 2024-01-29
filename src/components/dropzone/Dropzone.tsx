import { Box, Card, SxProps, Theme, useTheme } from "@mui/material";
import { FC, useCallback } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDropzone } from "react-dropzone";
import { useFileUploader } from "../../hooks/application/useFileUploader";
import { Upload_upload } from "../../graphql/file";

type DropzoneProps = {
  message?: string;
  btnSx?: SxProps<Theme>;
  loading?: boolean;
  onFinished?: (data: Upload_upload[]) => void;
  acceptedType?: string;
};

export const Dropzone: FC<DropzoneProps> = ({
  message,
  btnSx,
  onFinished,
  acceptedType,
}) => {
  const theme = useTheme();
  const { uploadFile } = useFileUploader();
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const files = await uploadFile(acceptedFiles);
    onFinished && onFinished(files ?? []);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div {...getRootProps()}>
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          textTransform: "none",
          ...btnSx,
          backgroundSize: "cover",
          cursor: "pointer",
          border: `1px dashed ${theme.palette.primary.main}`,
        }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            alignItems: "center",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <AddAPhotoIcon />
          {isDragActive ? <p>Drop the files here ...</p> : <p>{message}</p>}
        </Box>
      </Box>
    </div>
  );
};
