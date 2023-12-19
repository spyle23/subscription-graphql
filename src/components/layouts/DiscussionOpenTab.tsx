import { useContext, FC, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { DiscussionContext } from "../../contexts/message";
import { DiscussionCard } from "../card/DiscussionCard";
import { useApplicationContext } from "../../hooks";
import { MessageInput } from "../../types/graphql-types";
import { MessageContext } from "../../pages/Message/Message";
import { MessageGlobalApp } from "../../types/message";
import { WriteMessage } from "../../graphql/message/types/WriteMessage";
import {
  MessageToUser,
  SendMessageDiscoussGroup_sendMessageDiscoussGroup,
} from "../../graphql/message";
import { ClosedDiscussion } from "../card/ClosedDiscussion";
import { determineUserOrGroup } from "../../pages/Message/components/PresenterMessage";
import { login_login_data } from "../../graphql/user";

type DiscussionOpenTabProps = {
  data?: MessageToUser;
  writting?: WriteMessage;
  sendMessage: (
    data: MessageInput,
    userId: number,
    discussionId: number,
    receiverId?: number | null,
    discussGroupId?: number | null
  ) => Promise<SendMessageDiscoussGroup_sendMessageDiscoussGroup | undefined>;
};

export const DiscussionOpenTab: FC<DiscussionOpenTabProps> = ({
  data,
  writting,
  sendMessage,
}) => {
  const { discussion, dispatchDiscussion } = useContext(DiscussionContext);
  const { user } = useApplicationContext();
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
            <Grid item md={4} key={`${i.id}`} sx={{ p: 1 }}>
              <DiscussionCard
                writting={writting}
                messageToUser={
                  i.id === data?.messageToUser.id
                    ? data.messageToUser
                    : undefined
                }
                discussion={i}
                user={user}
                dispatchDiscussion={dispatchDiscussion}
                sendMessage={sendMessage}
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
              key={`${i.id}`}
            />
          ))}
      </Box>
    </Box>
  );
};
