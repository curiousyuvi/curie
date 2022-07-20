import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rooms from "./pages/Rooms";
import ChatWrapper from "./components/ChatWrapper";
import CreateRoom from "./pages/CreateRoom";
import CreateUser from "./pages/CreateUser";
import JoinRoom from "./pages/JoinRoom";
import Login from "./pages/Login";
import SpotifyCallback from "./pages/SpotifyCallback";
import UserProfile from "./pages/UserProfile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LayoutWrapper from "./components/LayoutWrapper";
import NoRoom from "./components/NoRoom";
import ChatRoomDetails from "./pages/ChatRoomDetails";
import ChatRoom from "./pages/ChatRoom";
import RoomWrapper from "./components/RoomWrapper";
import EditRoom from "./pages/EditRoom";
import EditUser from "./pages/EditUser";
import { BrowserView, MobileView } from "react-device-detect";
import NotSupportedInMobile from "./components/NotSupportedInMobile";

function App() {
  return (
    <>
      <MobileView className="w-full h-full">
        <NotSupportedInMobile />
      </MobileView>
      <BrowserView className="w-full h-full">
        <Router>
          <Routes>
            <Route path="/" element={<LayoutWrapper />}>
              <Route element={<ProtectedRoutes.NoAuth />}>
                <Route path="login" element={<Login />} />
                <Route path="spotify_callback" element={<SpotifyCallback />} />
                <Route path="create_user" element={<CreateUser />} />
              </Route>
              <Route element={<ProtectedRoutes.Auth />}>
                <Route element={<ChatWrapper />}>
                  <Route element={<Rooms />}>
                    <Route index element={<NoRoom />} />
                    <Route element={<RoomWrapper />}>
                      <Route path=":rid" element={<ChatRoom />}>
                        <Route path="details" element={<ChatRoomDetails />} />
                        <Route path="edit" element={<EditRoom />} />
                      </Route>
                    </Route>
                  </Route>
                  <Route path="user_profile" element={<UserProfile />} />
                  <Route path="edit_profile" element={<EditUser />} />
                  <Route path="join_room" element={<JoinRoom />} />
                  <Route path="create_room" element={<CreateRoom />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </BrowserView>
    </>
  );
}

export default App;
