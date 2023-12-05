import { Box, Button, Typography } from "@mui/material";
import { ContainerMessage } from "./ContainerMessage";
import { useState, FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { NewMessageModal } from "../../../components/modal/NewMessageModal";
import {
  MessagesOfCurrentUser,
  MessagesOfCurrentUserVariables,
} from "../../../graphql/message/types/MessagesOfCurrentUser";
import { ApolloQueryResult } from "@apollo/client";
import {
  MessageToUser,
  MessageTwoUser,
  MessageTwoUserVariables,
} from "../../../graphql/message";
import { WriteMessage } from "../../../graphql/message/types/WriteMessage";

type FirstpageMessageProps = {
  messageData: MessagesOfCurrentUser | undefined;
  writting?:WriteMessage
  data?: MessageToUser;
  refetchMessageData: (
    variables?: Partial<MessagesOfCurrentUserVariables> | undefined
  ) => Promise<ApolloQueryResult<MessagesOfCurrentUser>>;
  refetch: (
    variables?: Partial<MessageTwoUserVariables> | undefined
  ) => Promise<ApolloQueryResult<MessageTwoUser>>;
  onClose?: () => void;
};

export const FirstpageMessage: FC<FirstpageMessageProps> = ({
  messageData,
  data,
  refetch,
  refetchMessageData,
  onClose,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box>
      <Box>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          📧 Messages
        </Typography>
      </Box>
      <Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" onClick={() => setOpen(true)}>
          <AddIcon />
          Nouveau message
        </Button>
      </Box>
      <ContainerMessage
        data={data}
        messageData={messageData}
        onClose={onClose}
      />
      <NewMessageModal
        open={open}
        onClose={() => setOpen(false)}
        refetch={refetch}
        refetchMessage={refetchMessageData}
      />
    </Box>
  );
};
