import { Grid, GridProps, IconButton } from "@mui/material";
import { DisplayMedia } from "./DisplayMedia";
import { ICompare } from "../../types/Upload";
import { Delete } from "@mui/icons-material";
import { FileInput } from "../../types/graphql-types";

type ContainerDisplayProps<T> = {
  data: T[];
  deleteFile?: (data: T) => Promise<void>;
} & GridProps;

const determineWidth = (isImage: boolean, length: number): number => {
  if (!isImage) return 12;
  if (length >= 3) return 4;
  else if (length === 1) return 8;
  else return 6;
};

export const ContainerDisplay = <T extends FileInput>({
  data,
  deleteFile,
  ...props
}: ContainerDisplayProps<T>) => {
  const newData = data ? [...data] : [];
  const lengthFilterData = newData.filter((i) =>
    ["image", "video"].includes(i.extension.split("/")[0])
  ).length;
  return (
    <Grid container {...props}>
      {newData
        .sort((a, b) => {
          const order: ICompare = { image: 0, video: 1 };
          const indexA = order[a.extension.split("/")[0]] || Infinity;
          const indexB = order[b.extension.split("/")[0]] || Infinity;

          if (indexA !== indexB) {
            return indexA - indexB;
          }
          return a.name.localeCompare(b.name);
        })
        .map((val) => (
          <Grid
            item
            xs={determineWidth(
              ["image", "video"].includes(val.extension.split("/")[0]),
              lengthFilterData
            )}
            key={val.url}
            sx={{
              p: ["image", "video"].includes(val.extension.split("/")[0])
                ? 0
                : 1,
              position: "relative",
            }}
          >
            <DisplayMedia data={val} />
            {deleteFile && (
              <IconButton
                onClick={async () => await deleteFile(val)}
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                <Delete color="error" />
              </IconButton>
            )}
          </Grid>
        ))}
    </Grid>
  );
};
