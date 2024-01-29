import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import { ContainerMessage } from "./ContainerMessage";
import { useState, FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { NewMessageModal } from "../../../components/modal/NewMessageModal";
import {
  ApolloQueryResult,
  FetchMoreQueryOptions,
  OperationVariables,
} from "@apollo/client";
import { WriteMessage } from "../../../graphql/message/types/WriteMessage";
import {
  GetDiscussionCurrentUser,
  GetDiscussionCurrentUserVariables,
  GetDiscussionCurrentUser_getDiscussionCurrentUser,
} from "../../../graphql/discussion/types/GetDiscussionCurrentUser";
import { MessageGlobalApp } from "../../../types/message";
import { MessageInput } from "../../../types/graphql-types";
import { SendMessageDiscoussGroup_sendMessageDiscoussGroup } from "../../../graphql/message";

type FirstpageMessageProps = {
  discussions: MessageGlobalApp[];
  loading: boolean;
  sendMessage: (
    data: MessageInput,
    userId: number,
    discussionId: number,
    receiverId?: number | null | undefined,
    discussGroupId?: number | null | undefined
  ) => Promise<SendMessageDiscoussGroup_sendMessageDiscoussGroup | undefined>;
  fetchMore: <
    TFetchData = GetDiscussionCurrentUser,
    TFetchVars extends OperationVariables = GetDiscussionCurrentUserVariables
  >(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData> & {
      updateQuery?: (
        previousQueryResult: GetDiscussionCurrentUser,
        options: {
          fetchMoreResult: TFetchData;
          variables: TFetchVars;
        }
      ) => GetDiscussionCurrentUser;
    }
  ) => Promise<ApolloQueryResult<TFetchData>>;
  onSelect: (data: GetDiscussionCurrentUser_getDiscussionCurrentUser) => void;
  writting?: WriteMessage;
  refetchMessageData: (
    variables?: Partial<GetDiscussionCurrentUserVariables> | undefined
  ) => Promise<ApolloQueryResult<GetDiscussionCurrentUser>>;
  onClose?: () => void;
  sx?: SxProps<Theme>;
};

export const FirstpageMessage: FC<FirstpageMessageProps> = ({
  discussions,
  onSelect,
  sendMessage,
  loading,
  fetchMore,
  refetchMessageData,
  onClose,
  sx,
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
        loading={loading}
        fetchMore={fetchMore}
        selectDiscussion={onSelect}
        onClose={onClose}
        sx={sx}
      />
      <NewMessageModal
        open={open}
        sendMessage={sendMessage}
        onClose={() => setOpen(false)}
        refetchMessage={refetchMessageData}
      />
    </Box>
  );
};
