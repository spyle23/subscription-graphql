import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Box, SpeedDial, SpeedDialProps, SxProps, Theme } from "@mui/material";
import { IAction } from "./FirstpageMessage";
import { FC } from "react";

type SpeedDialMessageProps = {
  actions: IAction[];
  sxBox?: SxProps<Theme>;
} & SpeedDialProps;
export const SpeedDialMessage: FC<SpeedDialMessageProps> = ({
  actions,
  sx,
  sxBox,
  ...props
}) => {
  return (
    <Box
      sx={{
        transform: "translateZ(0px)",
        flexGrow: 1,
        position: "sticky",
        bottom: 0,
        right: 0,
        ...sxBox,
      }}
    >
      <SpeedDial
        sx={{ position: "absolute", bottom: 2, right: 2, ...sx }}
        icon={<SpeedDialIcon />}
        {...props}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};
