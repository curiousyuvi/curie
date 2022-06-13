import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Room from "./components/Room";
import Rooms from "./components/Rooms";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import CreateRoom from "./pages/CreateRoom";
import CreateUser from "./pages/CreateUser";
import JoinRoom from "./pages/JoinRoom";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import SpotifyCallback from "./pages/SpotifyCallback";
import UserProfile from "./pages/UserProfile";
import UserProvider from "./providers/UserProvider";
import RoomProvider from "./providers/RoomProvider";

function App() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/bg-static.jpg"
        className="w-auto h-full min-w-[100%] min-h-[100%] fixed z-[-1] object-cover"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>
      <UserProvider>
        <RoomProvider>
          <div className="w-full h-full flex justify-center items-center p-4 text-gray-300">
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="auth/login" element={<Login />} />
                <Route
                  path="auth/spotify_callback"
                  element={<SpotifyCallback />}
                />
                <Route path="auth/create-user" element={<CreateUser />} />
                <Route path="chat" element={<Chat />}>
                  <Route path="rooms" element={<Rooms />}>
                    <Route path=":rid" element={<Room />} />
                  </Route>
                  <Route path="user-profile" element={<UserProfile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="join-room" element={<JoinRoom />} />
                  <Route path="create-room" element={<CreateRoom />} />
                </Route>
              </Routes>
            </Router>
          </div>
        </RoomProvider>
      </UserProvider>
    </>
  );
}

export default App;
