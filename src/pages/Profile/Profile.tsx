import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useApplicationContext } from "../../hooks";
import CollectionsIcon from "@mui/icons-material/Collections";
import { useForm } from "react-hook-form";
import { RequestStatus, UpdateUserInput } from "../../types/graphql-types";
import { useCurrentUser } from "../../hooks/user/useCurrentUser";
import { useUpdateUser } from "../../hooks/user/useUpdateUser";
import { usePhotoUrl } from "../../hooks/application/usePhotoUrl";
import { CustomUpload } from "../../components/dropzone/CustomUpload";
import { Upload_upload } from "../../graphql/file";
import profilImage from "../../assets/profil.png";
import { Route, Routes, useParams } from "react-router-dom";
import { Profile_profile_relation } from "../../graphql/user";
import { UserInfo } from "./components/UserInfo";
import { UserFriends } from "./components/UserFriends";
import { ContainerPost } from "./components/ContainerPost";
import { ProfileInfoSkeleton } from "../../components/skeleton/ProfileInfoSkeleton";
import { FriendSkeleton } from "../../components/skeleton/FriendSkeleton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { UserAbout } from "./UserAbout";
import { ProfilFriends } from "./ProfilFriends";

const determineText = (relation?: Profile_profile_relation | null) => {
  switch (relation?.status) {
    case RequestStatus.PENDING:
      return {
        label: "Invitation envoyée",
        icon: <HowToRegIcon sx={{ fill: "white" }} />,
      };
    case RequestStatus.ACCEPTED:
      return {
        label: "Ami",
        icon: <PeopleIcon sx={{ fill: "white" }} />,
      };
    default:
      return {
        label: "Ajouter comme ami",
        icon: <PersonAddIcon sx={{ fill: "white" }} />,
      };
  }
};

const Profile = (): JSX.Element => {
  const theme = useTheme();
  const { id } = useParams();
  const { user, setUser } = useApplicationContext();
  const {
    data: userInfo,
    refetch,
    loading,
  } = useCurrentUser(id ? parseFloat(id) : undefined, user?.id);
  const {
    register,
    formState: { errors },
    reset,
    getValues,
    handleSubmit,
  } = useForm<UpdateUserInput>();

  const { updateUser } = useUpdateUser();

  const handleUpdate = async (data: UpdateUserInput) => {
    await updateUser(data);
  };
  const onFinished = async (data: Upload_upload[]) => {
    const values = getValues();
    await updateUser({ ...values, photo: data[0].url });
    const { data: newUser } = await refetch();
    if (user && newUser.profile) {
      setUser({ ...user, photo: newUser.profile?.user.photo });
    }
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          my: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: 200, height: 200, position: "relative", mr: 2 }}>
          {loading && (
            <Skeleton
              variant="circular"
              sx={{ width: "100%", height: "100%" }}
            />
          )}
          <Avatar
            alt={userInfo?.user.firstname || "profile"}
            src={usePhotoUrl(userInfo?.user.photo ?? undefined) || profilImage}
            sx={{ width: "100%", height: "100%" }}
          />
          {id && parseFloat(id) === user?.id && (
            <Box
              sx={{
                width: "max-content",
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              <CustomUpload onFinished={onFinished}>
                <IconButton>
                  <CollectionsIcon sx={{ fill: theme.palette.primary.main }} />
                </IconButton>
              </CustomUpload>
            </Box>
          )}
        </Box>
      </Box>
      <Typography
        fontWeight="bold"
        fontSize="1.5em"
        sx={{ textAlign: "center" }}
      >
        {userInfo?.user.firstname} {userInfo?.user.lastname}
      </Typography>
      {id && parseFloat(id) !== user?.id && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
          <Button variant="contained" sx={{ textTransform: "none" }}>
            <Typography sx={{ color: "white", mr: 1 }}>
              {determineText(userInfo?.relation).label}
            </Typography>
            {determineText(userInfo?.relation).icon}
          </Button>
        </Box>
      )}
      <Routes>
        <Route
          index
          element={
            <UserAbout loading={loading} user={user} userInfo={userInfo} />
          }
        />
        <Route
          path="friends"
          element={
            <ProfilFriends
              profilId={id ? parseFloat(id) : undefined}
              user={user}
            />
          }
        />
      </Routes>
    </Container>
  );
};

export default Profile;
