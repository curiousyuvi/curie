import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Rooms from "./pages/Rooms";
import ChatWrapper from "./components/ChatWrapper";
import CreateRoom from "./pages/CreateRoom";
import CreateUser from "./pages/CreateUser";
import JoinRoom from "./pages/JoinRoom";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import SpotifyCallback from "./pages/SpotifyCallback";
import UserProfile from "./pages/UserProfile";
import AuthProvider from "./providers/AuthProvider";
import RoomsProvider from "./providers/RoomsProvider";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LayoutWrapper from "./components/LayoutWrapper";
import NoRoom from "./components/NoRoom";
import ChatRoomDetails from "./pages/ChatRoomDetails";
import ChatRoom from "./pages/ChatRoom";
import RoomWrapper from "./components/RoomWrapper";
import RoomMusicProvider from "./providers/RoomMusicProvider";
import WebPlaybackWrapper from "./components/WebPlaybackWrapper";

function App() {
  return (
    <>
      <AuthProvider>
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
                      <Route path=":rid" element={<ChatRoom />} />
                      <Route
                        path=":rid/details"
                        element={<ChatRoomDetails />}
                      />
                    </Route>
                  </Route>
                  <Route path="user_profile" element={<UserProfile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="join_room" element={<JoinRoom />} />
                  <Route path="create_room" element={<CreateRoom />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
