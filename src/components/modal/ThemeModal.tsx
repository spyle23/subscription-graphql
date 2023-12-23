import {
  Box,
  BoxProps,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { MessageGlobalApp } from "../../types/message";
import CloseIcon from "@mui/icons-material/Close";
import { themes } from "../../constants/themes";
import { DiscussionContext } from "../../contexts/message";
import { useMutation } from "@apollo/client";
import {
  ChangeTheme,
  ChangeThemeVariables,
} from "../../graphql/discussion/types/ChangeTheme";
import { CHANGE_THEME } from "../../graphql/discussion";
import { useApplicationContext } from "../../hooks";

type ThemeModalProps = {
  discussion: MessageGlobalApp;
} & DialogProps;

type ThemeCircleProps = {
  theme: string;
} & BoxProps;

const ThemeCircle: FC<ThemeCircleProps> = ({ theme, sx, ...props }) => {
  return (
    <Box
      sx={{
        p: 1,
        width: "64px",
        height: "64px",
        mr: 1,
        borderRadius: "5px",
        ...sx,
      }}
      {...props}
    >
      <Box
        sx={{
          width: "50px",
          height: "50px",
          background: theme,
          borderRadius: "50%",
        }}
      />
    </Box>
  );
};

export const ThemeModal: FC<ThemeModalProps> = ({
  discussion,
  onClose,
  ...props
}) => {
  const { user } = useApplicationContext();
  const [exec] = useMutation<ChangeTheme, ChangeThemeVariables>(CHANGE_THEME);
  const [defaultTheme] = useState(discussion.theme);
  const { dispatchDiscussion } = useContext(DiscussionContext);
  const [selected, setSelected] = useState<number>();
  const handleSelect = (val: string, index: number) => {
    setSelected(index);
    dispatchDiscussion({ type: "change Theme", theme: val, value: discussion });
  };
  const handleCancel = () => {
    dispatchDiscussion({
      type: "change Theme",
      theme: defaultTheme,
      value: discussion,
    });
    setSelected(undefined);
    onClose && onClose({}, "escapeKeyDown");
  };
  const handleSubmit = async () => {
    if (!selected) return;
    await exec({
      variables: {
        data: {
          id: discussion.id,
          theme: themes[selected],
          userId: user?.id as number,
          receiverId:
            "groupName" in discussion.userDiscuss
              ? null
              : discussion.userDiscuss.id,
        },
      },
    });
    onClose && onClose({}, "escapeKeyDown");
  };
  return (
    <Dialog {...props}>
      <DialogTitle sx={{ textAlign: "center" }}>
        Thème
        <IconButton
          sx={{ position: "absolute", top: 5, right: 5 }}
          onClick={() => onClose && onClose({}, "backdropClick")}
        >
          <CloseIcon color="primary" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex" }}>
        {themes.map((i, index) => (
          <ThemeCircle
            theme={i}
            key={index}
            onClick={() => handleSelect(i, index)}
            sx={{
              background:
                selected === index
                  ? "linear-gradient(to bottom, #4CAF50, #45a049)"
                  : undefined,
              boxShadow:
                selected === index
                  ? "0 4px 8px rgba(76, 175, 80, 0.4)"
                  : undefined,
            }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleCancel}>
          Annuler
        </Button>
        <Button variant="contained" disabled={!selected} onClick={handleSubmit}>
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};
