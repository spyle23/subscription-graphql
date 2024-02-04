import {
  Box,
  Button,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
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
import SearchIcon from "@mui/icons-material/Search";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import MessageIcon from "@mui/icons-material/Message";
import { SpeedDialMessage } from "./SpeedDial";

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

export type IAction = {
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
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
  const actions: IAction[] = [
    {
      name: "Nouveau message",
      icon: <MessageIcon />,
      onClick: () => setOpen(true),
    },
    {
      name: "Paramètres des messages",
      icon: <SettingsApplicationsIcon />,
    },
  ];
  return (
    <Box>
      <Box>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Messages
        </Typography>
      </Box>
      <Box sx={{ my: 2, display: "flex", justifyContent: "center", px: 1 }}>
        {/* <Button variant="outlined" onClick={() => setOpen(true)}>
          <AddIcon />
          Nouveau message
        </Button> */}
        <TextField
          fullWidth
          placeholder="Recherche..."
          InputProps={{
            sx: {
              borderRadius: "25px !important",
            },
            endAdornment: <SearchIcon />,
          }}
        />
      </Box>
      <ContainerMessage
        discussions={discussions}
        loading={loading}
        fetchMore={fetchMore}
        selectDiscussion={onSelect}
        onClose={onClose}
        sx={sx}
      />
      <SpeedDialMessage ariaLabel="Speed dial for message" actions={actions} />
      <NewMessageModal
        open={open}
        sendMessage={sendMessage}
        onClose={() => setOpen(false)}
        refetchMessage={refetchMessageData}
      />
    </Box>
  );
};
