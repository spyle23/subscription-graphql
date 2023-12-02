import { useContext, FC } from "react";
import { Avatar, Box, Grid } from "@mui/material";
import { DiscussionContext } from "../../contexts/message";
import { DiscussionCard } from "../card/DiscussionCard";
import { useApplicationContext } from "../../hooks";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { MessageInput } from "../../types/graphql-types";
import { MessageContext } from "../../pages/Message/Message";
import { MessageActionType } from "../../types/message";

type DiscussionOpenTabProps = {
  sendMessage: (data: MessageInput) => Promise<void>;
};

export const DiscussionOpenTab: FC<DiscussionOpenTabProps> = ({
  sendMessage,
}) => {
  const { discussion, dispatchDiscussion } = useContext(DiscussionContext);
  const { dispatch } = useContext(MessageContext);
  const { user } = useApplicationContext();

  const changedSendMessage = async (
    data: MessageInput,
    value?: MessageActionType
  ) => {
    dispatch({
      type: "from message",
      message: value,
      userDiscuss: null,
    });
    await sendMessage(data);
  };
  return (
    <Box
      sx={{
        width: "70%",
        position: "fixed",
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Grid container sx={{ width: "90%" }}>
        {discussion
          .filter((val) => val.openMessage)
          .map((i) => (
            <Grid
              item
              md={4}
              key={`${i.discussGroupId ? i.discussGroupId : i.receiverId}`}
              sx={{ p: 1 }}
            >
              <DiscussionCard
                discussion={i}
                user={user}
                dispatchDiscussion={dispatchDiscussion}
                sendMessage={changedSendMessage}
              />
            </Grid>
          ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          minHeight: "350px",
          py: 2,
          width: "10%",
        }}
      >
        {discussion
          .filter((val) => !val.openMessage)
          .map((i) => (
            <Box
              key={`${i.discussGroupId ? i.discussGroupId : i.receiverId}`}
              onClick={() =>
                dispatchDiscussion({ type: "trigger", trigger: true, value: i })
              }
              sx={{
                width: "max-content",
                mb: 2,
                position: "relative",
                cursor: "pointer",
                ":hover": {
                  ".MuiSvgIcon-root": {
                    display: "block",
                  },
                },
              }}
            >
              {i.userDiscuss ? (
                <DynamicAvatar user={i.userDiscuss} sx={{ mr: 0 }} />
              ) : (
                <Avatar
                  src={
                    i.DiscussGroup?.coverPhoto
                      ? i.DiscussGroup.coverPhoto
                      : undefined
                  }
                />
              )}
              <CancelOutlinedIcon
                onClick={() =>
                  dispatchDiscussion({ type: "delete discussion", value: i })
                }
                sx={{
                  fontSize: "small",
                  fill: (theme) => theme.palette.primary.main,
                  cursor: "pointer",
                  position: "absolute",
                  top: 0,
                  display: "none",
                  right: 0,
                }}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
};
