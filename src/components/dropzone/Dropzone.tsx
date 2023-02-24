import { Box, Card, SxProps, Theme, useTheme } from "@mui/material";
import { FC, useCallback } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDropzone } from "react-dropzone";

type DropzoneProps = {
  message?: string;
  btnSx?: SxProps<Theme>;
  loading?: boolean;
  onFinished?: (file?: string, name?: string) => void;
  acceptedType?: string;
};

export const Dropzone: FC<DropzoneProps> = ({
  message,
  btnSx,
  onFinished,
  acceptedType,
}) => {
  const theme = useTheme();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = () => {
      const file = reader.result?.toString();
      if (file) {
        onFinished && onFinished(file, acceptedFiles[0].name);
      }
    };
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
