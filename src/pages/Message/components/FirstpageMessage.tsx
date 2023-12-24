import { Box, Button, Typography } from "@mui/material";
import { ContainerMessage } from "./ContainerMessage";
import { useState, FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { NewMessageModal } from "../../../components/modal/NewMessageModal";
import { ApolloQueryResult } from "@apollo/client";
import { WriteMessage } from "../../../graphql/message/types/WriteMessage";
import {
  GetDiscussionCurrentUser,
  GetDiscussionCurrentUserVariables,
  GetDiscussionCurrentUser_getDiscussionCurrentUser,
} from "../../../graphql/discussion/types/GetDiscussionCurrentUser";
import { MessageGlobalApp } from "../../../types/message";

type FirstpageMessageProps = {
  discussions: MessageGlobalApp[];
  onSelect: (data: GetDiscussionCurrentUser_getDiscussionCurrentUser) => void;
  writting?: WriteMessage;
  refetchMessageData: (
    variables?: Partial<GetDiscussionCurrentUserVariables> | undefined
  ) => Promise<ApolloQueryResult<GetDiscussionCurrentUser>>;
  onClose?: () => void;
};

export const FirstpageMessage: FC<FirstpageMessageProps> = ({
  discussions,
  onSelect,
  refetchMessageData,
  onClose,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box>
      <Box>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Messages
        </Typography>
      </Box>
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          <AddIcon />
          Nouveau message
        </Button>
      </Box>
      <ContainerMessage
        discussions={discussions}
        selectDiscussion={onSelect}
        onClose={onClose}
      />
      <NewMessageModal
        open={open}
        onClose={() => setOpen(false)}
        refetchMessage={refetchMessageData}
      />
    </Box>
  );
};
