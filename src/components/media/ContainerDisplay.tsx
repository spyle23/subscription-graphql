import { Grid, GridProps, IconButton } from "@mui/material";
import { DisplayMedia } from "./DisplayMedia";
import { ICompare } from "../../types/Upload";
import { Delete } from "@mui/icons-material";
import { FileInput } from "../../types/graphql-types";

type ContainerDisplayProps<T> = {
  data: T[];
  deleteFile?: (data: T) => Promise<void>;
} & GridProps;

export const ContainerDisplay = <T extends FileInput>({
  data,
  deleteFile,
  ...props
}: ContainerDisplayProps<T>) => {
  return (
    <Grid container {...props}>
      {data
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
            xs={
              ["image", "video"].includes(val.extension.split("/")[0]) ? 4 : 8
            }
            key={val.url}
            sx={{ p: 1 }}
          >
            <DisplayMedia data={val} />
            {deleteFile && (
              <IconButton
                onClick={async () => await deleteFile(val)}
                sx={{ position: "absolute", bottom: 5, right: 5 }}
              >
                <Delete color="error" />
              </IconButton>
            )}
          </Grid>
        ))}
    </Grid>
  );
};
