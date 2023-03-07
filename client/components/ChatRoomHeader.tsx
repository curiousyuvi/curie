import React, { useEffect, useState } from "react";
import {
  IoArrowBack,
  IoEllipsisVerticalOutline,
  IoEllipsisVertical,
  IoExitOutline,
} from "react-icons/io5";
import { RoomShort } from "../interfaces/RoomShort";
import Tooltip from "react-power-tooltip";
import { AiOutlineCopy } from "react-icons/ai";
import useToast from "../hooks/useToast";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { removeRoom } from "../store/roomsSlice";
import useSocket from "../hooks/useSocket";
import { RootState } from "../store";
import { Avatar, AvatarGroup, Badge, styled } from "@mui/material";
import { User } from "../interfaces/User";
import { apiInstance, onlineUsersAPI } from "../services/apiServices";
import useGetOnlineUsers from "../hooks/useGetOnlineUsers";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#4ade80",
    color: "#4ade80",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      //   animation: "ripple 1.2s infinite ease-in-out",
      border: "none",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatRoomHeader = ({ room }: { room: RoomShort }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { successToast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  const handleBackClick = () => {
    router.replace("/");
  };
  const handleCopyRid = () => {
    navigator.clipboard.writeText(room.rid);
    successToast("Room ID copied to clipboard!");
  };
  const { socket } = useSocket();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const handleLeaveRoom = () => {
    if (socket && currentUser)
      socket.emit("send_leave_room", {
        user: currentUser,
        rid: router.query?.rid,
      });
    router.replace("/");
    dispatch(removeRoom(room.rid));
  };
  const handleOptionsOpen = () => {
    setShowOptions(true);
  };

  const handleOptionsClose = () => {
    setShowOptions(false);
  };

  const handleReceivejoinRoomSocket = ({
    user,
    rid,
  }: {
    user: User;
    rid: string;
  }) => {
    if (rid === router.query?.rid) {
      const exists = onlineUsers.find(
        (onlineUser) => onlineUser.uid === user.uid
      );
      if (!exists) {
        setOnlineUsers([...onlineUsers, user]);
      }
    }
  };

  const handleReceiveLeaveRoomSocket = ({
    user,
    rid,
  }: {
    user: User;
    rid: string;
  }) => {
    if (rid === router.query?.rid) {
      setOnlineUsers(
        onlineUsers.filter((onlineUser) => onlineUser.uid !== user.uid)
      );
    }
  };

  const { data: onlineUsersData } = useGetOnlineUsers(router?.query?.rid);

  useEffect(() => {
    if (onlineUsersData?.data?.onlineUsers)
      setOnlineUsers(
        onlineUsersData?.data?.onlineUsers.filter(
          (onlineUser: User) => onlineUser.uid !== currentUser.uid
        )
      );
  }, [onlineUsersData]);

  useEffect(() => {
    if (socket) socket.on("receive_join_room", handleReceivejoinRoomSocket);
    return () => {
      socket?.off("receive_join_room", handleReceivejoinRoomSocket);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (socket) socket.on("receive_leave_room", handleReceiveLeaveRoomSocket);
    return () => {
      socket?.off("receive_leave_room", handleReceiveLeaveRoomSocket);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div className="w-full h-16 border-b border-indigo-300/30 bg-blue-900/90 px-2 py-1 flex items-center">
      <button
        className="text-2xl hover:text-white duration-100 sm:hidden"
        onClick={handleBackClick}
      >
        <IoArrowBack />
      </button>
      <img
        alt="room"
        src={room.image_url}
        className="h-10 rounded-full mx-2 aspect-square object-cover"
      />
      <h2>{room.name}</h2>
      <div className=" ml-auto" />

      <AvatarGroup
        max={4}
        sx={{
          "& .MuiAvatar-root": {
            width: 30,
            height: 30,
            fontSize: "0.8rem",
            border: "2px solid #21378D",
          },
        }}
      >
        {onlineUsers.map((onlineUser) => (
          <StyledBadge
            key={onlineUser.uid}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt={onlineUser?.name} src={onlineUser?.avatarUrl} />
          </StyledBadge>
        ))}
      </AvatarGroup>
      <button
        onMouseOver={handleOptionsOpen}
        onMouseLeave={handleOptionsClose}
        className="relative text-2xl p-2 hover:bg-white/10 rounded-full group duration-100"
      >
        <IoEllipsisVerticalOutline className="group-hover:hidden" />
        <IoEllipsisVertical className="hidden group-hover:flex text-white" />
        <Tooltip
          show={showOptions}
          position="left center"
          color="white"
          backgroundColor="rgba(64, 64, 64,0.3)"
          lineSeparated="1px solid rgba(1,1,1,0.3)"
        >
          <li
            onClick={handleCopyRid}
            className="text-base -translate-x-3 w-60 font-normal border-1 flex gap-2 items-center bg-red-600"
          >
            <AiOutlineCopy className="text-xl" /> Copy Room ID
          </li>
          <li
            onClick={handleLeaveRoom}
            className="text-base -translate-x-3 w-60 font-normal border-1 flex gap-2 items-center bg-red-600"
          >
            <IoExitOutline className="text-xl" /> Leave Room
          </li>
        </Tooltip>
      </button>
    </div>
  );
};

export default ChatRoomHeader;
