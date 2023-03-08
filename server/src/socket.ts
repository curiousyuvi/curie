import { Server } from "socket.io";
import { VotingRoom } from "./interfaces/VotingRoom";
import { getUnixEpochTime, midFromDate } from "./helpers/dateTimeHelper";
import updateRoom from "./services/updateRoom";
import postMessage from "./services/postMessage";

const setupSocket = (server, corsOptions) => {
  const io = new Server(server, { cors: corsOptions, allowEIO3: true });

  io.on("connect", (client) => {
    let clientData = { uid: "" };
    console.log("user connected with id " + client.id);

    const disconnectController = () => {
      console.log("user disconnected " + client.id);

      for (const roomKV of global.rooms.entries()) {
        client
          .to(roomKV[0])
          .emit("receive_leave_room", { user: clientData, rid: roomKV[0] });

        const newUsers = roomKV[1].onlineUsers.filter(
          (onlineUser) => onlineUser.uid !== clientData.uid
        );
        global.rooms.set(roomKV[0], { ...roomKV[1], onlineUsers: newUsers });
      }
    };

    const connectErrorController = (err) => {
      console.log(`connect_error due to ${err.message}`);
    };

    const sendCreateRoomController = ({ rid }) => {
      global.rooms.set(rid, {
        voting: false,
        yesUsers: [],
        noUsers: [],
        onlineUsers: [],
      });
    };

    const sendJoinRoomController = ({ user, rid }) => {
      clientData = user;
      client.join(rid);
      console.log(`user: ${user.uid} joined room : ${rid}`);
      client.to(rid).emit("receive_join_room", { user, rid });
      const room: VotingRoom = global.rooms.get(rid);

      if (!room) {
        global.rooms.set(rid, {
          voting: false,
          yesUsers: [],
          noUsers: [],
          onlineUsers: [user],
        });
      } else {
        const newUsers = [...room.onlineUsers, user];
        const uniqueNewUsers = newUsers.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.uid === value.uid)
        );
        global.rooms.set(rid, { ...room, onlineUsers: uniqueNewUsers });
      }
    };

    const sendLeaveRoomController = ({ user, rid }) => {
      client.leave(rid);
      console.log(`user: ${user.uid} left room : ${rid}`);
      client.to(rid).emit("receive_leave_room", { user, rid });
    };

    const sendMessageController = ({ message, rid }) => {
      client.to(rid).emit("receive_message", { rid, message });
    };

    const sendPlayPauseController = ({ uid, rid, play, progress }) => {
      client.to(rid).emit("receive_play_pause", { uid, rid, play });
      updateRoom(
        rid,
        {
          last_track_playing: play,
          last_track_progress: progress,
          last_track_timestamp: getUnixEpochTime(),
        },
        (err) => {
          if (err) console.error("Error in updating last track", err);
        }
      );
    };

    const sendPlayTrackController = async ({ user, rid, track }) => {
      const room: VotingRoom = global.rooms.get(rid);
      if (!room)
        global.rooms.set(rid, {
          voting: false,
          yesUsers: [],
          noUsers: [],
          onlineUsers: [user],
        });

      if (room && room?.voting) {
        client.emit("receive_voting_already", { rid });
      } else if (room.onlineUsers.length < 2) {
        updateRoom(
          rid,
          {
            last_track_id: track.id,
            last_track_name: track.name,
            last_track_channel: track.channel,
            last_track_thumbnail: track.thumbnail,
            last_track_playing: true,
            last_track_progress: 0,
            last_track_timestamp: getUnixEpochTime(),
          },
          (err) => {
            if (err) console.error("Error in updating last track", err);
          }
        );
        client.emit("receive_play_track", { user, rid, track });
        client.to(rid).emit("receive_play_track", { user, rid, track });
        client.emit("receive_message", {
          rid,
          message: {
            rid,
            mid: midFromDate(new Date()),
            type: "music",
            content: JSON.stringify(track),
            senderUid: user?.uid,
            senderName: user?.name,
            senderAvatar: user?.avatarUrl,
          },
        });
        client.to(rid).emit("receive_message", {
          rid,
          message: {
            rid,
            mid: midFromDate(new Date()),
            type: "music",
            content: JSON.stringify(track),
            senderUid: user?.uid,
            senderName: user?.name,
            senderAvatar: user?.avatarUrl,
          },
        });
        postMessage(
          {
            rid,
            type: "music",
            content: JSON.stringify(track),
            senderUid: user?.uid,
            senderName: user?.name,
            senderAvatar: user?.avatarUrl,
          },
          (err) => {
            console.error(err);
          }
        );
      } else {
        global.rooms.set(rid, {
          voting: true,
          yesUsers: [user.uid],
          noUsers: [],
          onlineUsers: room.onlineUsers,
        });
        client.emit("receive_voting_start", { user, rid, track });
        client.to(rid).emit("receive_voting_start", { user, rid, track });
        const finishVoting = () => {
          clearInterval(timer);
          client.emit("receive_voting_finish", { rid });
          client.to(rid).emit("receive_voting_finish", { rid });
          const room: VotingRoom = global.rooms.get(rid);
          if (room.yesUsers.length >= room.noUsers.length) {
            updateRoom(
              rid,
              {
                last_track_id: track.id,
                last_track_name: track.name,
                last_track_channel: track.channel,
                last_track_thumbnail: track.thumbnail,
                last_track_playing: true,
                last_track_progress: 0,
                last_track_timestamp: getUnixEpochTime(),
              },
              (err) => {
                if (err) console.error("Error in updating last track", err);
              }
            );
            client.emit("receive_play_track", { user, rid, track });
            client.to(rid).emit("receive_play_track", { user, rid, track });
            client.emit("receive_message", {
              rid,
              message: {
                rid,
                mid: midFromDate(new Date()),
                type: "music",
                content: JSON.stringify(track),
                senderUid: user?.uid,
                senderName: user?.name,
                senderAvatar: user?.avatarUrl,
              },
            });
            client.to(rid).emit("receive_message", {
              rid,
              message: {
                rid,
                mid: midFromDate(new Date()),
                type: "music",
                content: JSON.stringify(track),
                senderUid: user?.uid,
                senderName: user?.name,
                senderAvatar: user?.avatarUrl,
              },
            });
            postMessage(
              {
                rid,
                type: "music",
                content: JSON.stringify(track),
                senderUid: user?.uid,
                senderName: user?.name,
                senderAvatar: user?.avatarUrl,
              },
              (err) => {
                console.error(err);
              }
            );
          }
          global.rooms.set(rid, {
            voting: false,
            yesUsers: [],
            noUsers: [],
            onlineUsers: room.onlineUsers,
          });
        };
        const timer = setInterval(finishVoting, 15000);
      }
    };

    const sendVoteController = ({ uid, rid, yes }) => {
      const room: VotingRoom = global.rooms.get(rid);
      if (!room)
        global.rooms.set(rid, {
          voting: false,
          yesUsers: [],
          noUsers: [],
          onlineUsers: [],
        });
      else {
        if (room.voting) {
          room.yesUsers = room.yesUsers.filter((yesUser) => yesUser !== uid);
          room.noUsers = room.noUsers.filter((noUser) => noUser !== uid);

          if (yes) {
            room.yesUsers.push(uid);
          } else {
            room.noUsers.push(uid);
          }

          client.to(rid).emit("receive_vote", {
            rid,
            yesUsers: room.yesUsers,
            noUsers: room.noUsers,
          });
        }

        global.rooms.set(rid, {
          voting: true,
          yesUsers: room.yesUsers,
          noUsers: room.noUsers,
          onlineUsers: room.onlineUsers,
        });
      }
    };

    client.on("disconnect", disconnectController);

    client.on("connect_error", connectErrorController);

    client.on("send_create_room", sendCreateRoomController);

    client.on("send_join_room", sendJoinRoomController);

    client.on("send_leave_room", sendLeaveRoomController);

    client.on("send_message", sendMessageController);

    client.on("send_play_pause", sendPlayPauseController);

    client.on("send_play_track", sendPlayTrackController);

    client.on("send_vote", sendVoteController);
  });
};

export default setupSocket;
