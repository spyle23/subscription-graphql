import { Box, Typography } from "@mui/material";
import { FC } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import { FileInput } from "../../types/graphql-types";

type DisplayMediaProps<T> = {
  data: T;
};

const IconDisplay: FC<{ extension: string }> = ({ extension }) => {
  switch (extension) {
    case "pdf":
      return <PictureAsPdfIcon sx={{ fill: "white" }} />;
    case "x-zip-compressed":
      return <FolderZipIcon sx={{ fill: "white" }} />;
    default:
      return <InsertDriveFileIcon sx={{ fill: "white" }} />;
  }
};

export const DisplayMedia = <T extends FileInput>({
  data,
}: DisplayMediaProps<T>) => {
  const type = data.extension.split("/")[0];
  const extension = data.extension.split("/")[1];
  const fullUrl = `${import.meta.env.VITE_BASE_IMAGE}${data.url}`;
  switch (type) {
    case "image":
      return (
        <Box
          component="img"
          src={fullUrl}
          sx={{ width: "100%", borderRadius: "10px", minHeight: "50px" }}
        />
      );

    case "video":
      return (
        <Box
          component="video"
          controls
          src={fullUrl}
          sx={{ width: "100%", borderRadius: "10px" }}
        />
      );
    case "audio":
      return (
        <Box component="audio" controls>
          <Box component="source" src={fullUrl} type={data.extension} />
        </Box>
      );

    case "application":
      return (
        <Box sx={{ width: "100%", background: "#8e8ea0", p: 1, display: "flex", alignItems: "center", borderRadius: "10px" }}>
          <IconDisplay extension={extension} />
          <Typography sx={{ color: "white", mx: 1 }}>{data.name}</Typography>
        </Box>
      );
    default:
      return (
        <Box sx={{ width: "100%", background: "#8e8ea0", p: 1 }}>
          <Typography sx={{ color: "white" }}>
            <InsertDriveFileIcon sx={{ fill: "white" }} />
            {data.name}
          </Typography>
        </Box>
      );
  }
};
