import { Navigate, Route, Routes } from "react-router-dom";
import { ContainerWithMenu } from "../components/layouts/ContainerWithMenu";
import { PrivateRoute } from "./PrivateRoute";
import React, { Suspense } from "react";
import { CircularProgress } from "@mui/material";
const VideoCall = React.lazy(() => import("../pages/VideoCall"));
const Landing = React.lazy(() => import("../pages/Landing/Landing"));
const Message = React.lazy(() => import("../pages/Message/Message"));
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const FriendRequest = React.lazy(
  () => import("../pages/FriendRequest/FriendRequest")
);
const AuthenticationRoute = React.lazy(
  () => import("../pages/Authentication/AuthenticationRoute")
);

const PrivateRouter = (): JSX.Element => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="messages" element={<Message />} />
        <Route path="profil/:id/*" element={<Profile />} />
        <Route path="friend-requests" element={<FriendRequest />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export const MainRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route index element={<Navigate to="landing" />} />
      <Route
        path="/auth/*"
        element={
          <Suspense fallback={<CircularProgress />}>
            <AuthenticationRoute />
          </Suspense>
        }
      />
      <Route
        path="/landing/*"
        element={
          <PrivateRoute>
            <ContainerWithMenu>
              <PrivateRouter />
            </ContainerWithMenu>
          </PrivateRoute>
        }
      />
      <Route
        path="/call/*"
        element={
          <PrivateRoute>
            <Suspense fallback={<CircularProgress />}>
              <VideoCall />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};
