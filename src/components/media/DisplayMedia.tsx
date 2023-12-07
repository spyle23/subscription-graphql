import { Box } from "@mui/material";
import { FC } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

type DisplayMediaProps = {
  url: string;
  controls?: boolean;
  fill?: string;
};

export const DisplayMedia: FC<DisplayMediaProps> = ({
  url,
  controls,
  fill,
}) => {
  const type = url.split("/")[1];
  const fullUrl = `${import.meta.env.VITE_BASE_IMAGE}${url}`;
  switch (type) {
    case "image":
      return (
        <Box
          component="img"
          src={fullUrl}
          sx={{ width: "100%", borderRadius: "10px" }}
        />
      );

    case "video":
      return (
        <Box
          component="video"
          controls={controls}
          autoPlay
          src={fullUrl}
          sx={{ width: "100%", borderRadius: "10px" }}
        />
      );
    default:
      return (
        <PictureAsPdfIcon
          sx={{ fill: (theme) => fill ?? theme.palette.primary.main }}
        />
      );
  }
};
