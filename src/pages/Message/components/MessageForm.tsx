import { FC } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import CollectionsIcon from "@mui/icons-material/Collections";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { MessageInput } from "../../../types/graphql-types";
import { useMutation } from "@apollo/client";
import {
  SendMessageDiscoussGroup_sendMessageDiscoussGroup,
  WRITTING_CHECK,
} from "../../../graphql/message";
import {
  WrittingCheck,
  WrittingCheckVariables,
} from "../../../graphql/message/types/WrittingCheck";
import { login_login_data } from "../../../graphql/user";
import { useUploadForm } from "../../../hooks/useUploadForm";
import { CustomUpload } from "../../../components/dropzone/CustomUpload";
import { ContainerDisplay } from "../../../components/media/ContainerDisplay";
import { MessageGlobalApp } from "../../../types/message";
import { CustomIcon } from "../../../components/CustomIcon/CustomIcon";
import { extractColorFromGradient } from "../../../utils/theme";
import { makeStyles } from "@mui/styles";
import { DefaultTheme } from "@mui/system";

type MessageFormProps = {
  theme: string;
  sendMessage: (
    data: MessageInput,
    userId: number,
    discussionId: number,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => Promise<SendMessageDiscoussGroup_sendMessageDiscoussGroup | undefined>;
  discussion: MessageGlobalApp;
  user?: login_login_data;
};

type StyleProps = {
  hoverColor: string;
  focusedColor: string;
};

const useStyles = makeStyles<DefaultTheme, StyleProps, "customTextField">(
  (theme) => ({
    customTextField: (props) => ({
      "& .MuiOutlinedInput-root": {
        "&:hover fieldset.Mui-OutlinedInput-notchedOutline": {
          borderColor: props.hoverColor || "initial",
        },
        "&.Mui-focused fieldset.Mui-OutlinedInput-notchedOutline": {
          borderColor: props.focusedColor || "initial",
        },
      },
    }),
  })
);

export const MessageForm: FC<MessageFormProps> = ({
  sendMessage,
  theme,
  discussion,
  user,
}) => {
  const { register, handleSubmit, reset, watch, onFinished, dropFile } =
    useUploadForm<MessageInput>();
  const [writeMessage] = useMutation<WrittingCheck, WrittingCheckVariables>(
    WRITTING_CHECK
  );
  const classes = useStyles({
    hoverColor: discussion.theme,
    focusedColor: discussion.theme,
  });
  const colorIcons = extractColorFromGradient(theme);

  const handleFocus = async (isWritting: boolean) => {
    await writeMessage({
      variables: {
        isWritting: isWritting,
        userId: user?.id as number,
        discussionId: discussion.id,
      },
    });
  };

  const submitMessage = async (data: MessageInput) => {
    const newData: MessageInput = data.files ? data : { ...data, files: [] };
    await sendMessage(
      newData,
      user?.id as number,
      discussion.id,
      discussion.Receiver?.id !== user?.id
        ? discussion.Receiver?.id
        : discussion.User.id,
      discussion.DiscussGroup?.id
    );
    reset({ content: "", files: [] });
  };
  return (
    <Box sx={{ py: 1 }}>
      <ContainerDisplay data={watch().files??[]} deleteFile={dropFile} />
      <form
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
        onSubmit={handleSubmit(submitMessage)}
      >
        <CustomUpload onFinished={onFinished}>
          <IconButton>
            {colorIcons ? (
              <CustomIcon
                color1={colorIcons[0]}
                color2={colorIcons[1]}
                type={theme.split("-")[0] === "linear" ? "linear" : "radial"}
                id={`CollectionsIcon`}
              >
                <CollectionsIcon sx={{ fill: `url(#CollectionsIcon)` }} />
              </CustomIcon>
            ) : (
              <CollectionsIcon sx={{ fill: theme }} />
            )}
          </IconButton>
        </CustomUpload>
        <TextField
          {...register("content")}
          variant="outlined"
          className={classes.customTextField}
          InputProps={{
            sx: {
              borderRadius: "25px !important",
            },
          }}
          onFocus={async () => await handleFocus(true)}
          onBlur={async () => await handleFocus(false)}
          placeholder="votre message ..."
          sx={{
            width: "80%",
            borderImage: theme,
            borderImageSlice: 1,
          }}
        />
        <IconButton type="submit">
          {colorIcons ? (
            <CustomIcon
              color1={colorIcons[0]}
              color2={colorIcons[1]}
              type={theme.split("-")[0] === "linear" ? "linear" : "radial"}
              id={`PlayArrowIcon`}
            >
              <PlayArrowIcon sx={{ fill: `url(#PlayArrowIcon)` }} />
            </CustomIcon>
          ) : (
            <PlayArrowIcon sx={{ fill: theme }} />
          )}
        </IconButton>
      </form>
    </Box>
  );
};
