import { useContext, FC, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { DiscussionContext } from "../../contexts/message";
import { DiscussionCard } from "../card/DiscussionCard";
import { useApplicationContext } from "../../hooks";
import { MessageInput } from "../../types/graphql-types";
import { MessageContext } from "../../pages/Message/Message";
import { MessageActionType, MessageGlobalApp } from "../../types/message";
import { WriteMessage } from "../../graphql/message/types/WriteMessage";
import { MessageToUser } from "../../graphql/message";
import { ClosedDiscussion } from "../card/ClosedDiscussion";

type DiscussionOpenTabProps = {
  data?: MessageToUser;
  writting?: WriteMessage;
  sendMessage: (data: MessageInput) => Promise<void>;
};

export const DiscussionOpenTab: FC<DiscussionOpenTabProps> = ({
  data,
  writting,
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
  useEffect(() => {
    if (data) {
      dispatchDiscussion({
        type: "change newMessageNbr",
        data,
        value: {} as MessageGlobalApp,
      });
    }
  }, [data]);
  return (
    <Box
      sx={{
        width: "70%",
        position: "fixed",
        bottom: 0,
        right: 0,
        display: discussion.length > 0 ? "flex" : "none",
        justifyContent: "space-between",
      }}
    >
      <Grid container sx={{ width: "90%", justifyContent: "flex-end" }}>
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
                writting={writting}
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
            <ClosedDiscussion
              i={i}
              dispatchDiscussion={dispatchDiscussion}
              writting={writting}
              key={`${i.discussGroupId ? i.discussGroupId : i.receiverId}`}
            />
          ))}
      </Box>
    </Box>
  );
};
