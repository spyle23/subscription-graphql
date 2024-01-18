import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { login_login_data } from "../../graphql/user";
import { determineUserOrGroup } from "../../pages/Message/components/PresenterMessage";
import { DynamicAvatar } from "../Avatar/DynamicAvatar";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { ListenCall_listenCall } from "../../graphql/videoCall/types/ListenCall";

type ListenCallModalProps = {
  user: login_login_data;
  call: ListenCall_listenCall;
  handleCall: (status: boolean, userId: number) => void;
} & DialogProps;

export const ListenCallModal: FC<ListenCallModalProps> = ({
  call,
  user,
  handleCall,
  sx,
  ...props
}) => {
  const { discussion } = call;
  const userDiscuss = determineUserOrGroup(
    user,
    discussion.User,
    discussion.Receiver,
    discussion.DiscussGroup
  );
  return (
    <Dialog {...props}>
      <DialogTitle sx={{ width: 300, textAlign: "center" }}>Appel:</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 300,
          minHeight: 100,
        }}
      >
        <DynamicAvatar user={userDiscuss} />
        <Typography variant="h5">
          {"groupName" in userDiscuss
            ? userDiscuss.groupName
            : `${userDiscuss.firstname} ${userDiscuss.lastname}`}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <IconButton
          onClick={() => handleCall(true, user.id)}
          sx={{ mr: 1, backgroundColor: "green" }}
        >
          <CallIcon sx={{ fill: "white" }} />
        </IconButton>
        <IconButton
          onClick={() => handleCall(false, user.id)}
          sx={{ backgroundColor: "red" }}
        >
          <CallEndIcon sx={{ fill: "white" }} />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};
