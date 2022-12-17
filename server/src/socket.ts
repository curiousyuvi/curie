import { Server } from "socket.io";
import { VotingRoom } from "./interfaces/VotingRoom";

const setupSocket = (server, corsOptions) => {
    const io = new Server(server, { cors: corsOptions })

    io.on('connect', (client) => {
        console.log('user connected with id ' + client.id)

        client.on('disconnect', () => {
            console.log('user disconnected ' + client.id)
        })

        client.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });

        client.on('send_create_room', ({ rid }) => {
            global.rooms.set(rid, { voting: false, yesUsers: [], noUsers: [], onlineUsers: [] })

        })

        client.on('send_join_room', ({ user, rid }) => {
            client.join(rid);
            console.log(`user: ${user.uid} joined room : ${rid}`)
            client.to(rid).emit('receive_join_room', { user, rid })
            const room = global.rooms.get(rid)
            if (!room) global.rooms.set(rid, { voting: false, yesUsers: [], noUsers: [], onlineUsers: [user] })
            else {
                const newUsers = [...room.onlineUsers, user]
                const uniqueNewUsers = newUsers.filter((value, index, self) =>
                    index === self.findIndex((t) => (
                        t.uid === value.uid
                    ))
                )
                global.rooms.set(rid, { ...room, onlineUsers: uniqueNewUsers })

            }
        })

        client.on('send_leave_room', ({ user, rid }) => {
            client.leave(rid);
            console.log(`user: ${user.uid} left room : ${rid}`)
            client.to(rid).emit('receive_leave_room', { user, rid })
            const room = global.rooms.get(rid)
            if (!room) global.rooms.set(rid, { voting: false, yesUsers: [], noUsers: [], onlineUsers: [] })
            else {
                const newUsers = room.onlineUsers.filter(onlineUser => onlineUser.uid !== user.uid)
                global.rooms.set(rid, { ...room, onlineUsers: newUsers })
            }

        })

        client.on('send_message', ({ message, rid }) => {
            client.to(rid).emit('receive_message', { rid, message })
        })

        client.on('send_play_pause', ({ uid, rid, play }) => {
            client.to(rid).emit('receive_play_pause', { uid, rid, play })
        })

        client.on('send_play_track', async ({ uid, rid, track }) => {
            const room = global.rooms.get(rid)
            if (!room) global.rooms.set(rid, { voting: false, yesUsers: [], noUsers: [] })
            else {
                if (room && room?.voting) {
                    client.emit('receive_voting_already', { rid })
                }
                else {
                    global.rooms.set(rid, { voting: true, yesUsers: [uid], noUsers: [] })
                    client.emit('receive_voting_start', { uid, rid, track })
                    client.to(rid).emit('receive_voting_start', { uid, rid, track })
                    const finishVoting = () => {
                        clearInterval(timer);
                        client.emit('receive_voting_finish', { rid })
                        client.to(rid).emit('receive_voting_finish', { rid })
                        const room: VotingRoom = global.rooms.get(rid)
                        if (room.yesUsers.length >= room.noUsers.length) {
                            client.emit('receive_play_track', { uid, rid, track })
                            client.to(rid).emit('receive_play_track', { uid, rid, track })
                            client.emit('receive_message', { rid, message: { mid: "", type: "music", content: JSON.stringify(track), sender: uid } })
                            client.to(rid).emit('receive_message', { rid, message: { mid: "", type: "music", content: JSON.stringify(track), sender: uid } })

                        }
                        global.rooms.set(rid, { voting: false, yesUsers: [], noUsers: [] })
                    }
                    const timer = setInterval(finishVoting, 15000);
                }
            }
        })

        client.on('send_vote', ({ uid, rid, yes }) => {
            const room: VotingRoom = global.rooms.get(rid)
            if (!room) global.rooms.set(rid, { voting: false, yesUsers: [], noUsers: [] })
            else {
                if (room.voting) {
                    room.yesUsers = room.yesUsers.filter(yesUser => yesUser !== uid)
                    room.noUsers = room.noUsers.filter(noUser => noUser !== uid)

                    if (yes) {
                        room.yesUsers.push(uid)
                    }
                    else {
                        room.noUsers.push(uid)
                    }

                    client.to(rid).emit('receive_vote', { rid, yesUsers: room.yesUsers, noUsers: room.noUsers })
                }

                global.rooms.set(rid, { voting: true, yesUsers: room.yesUsers, noUsers: room.noUsers })
            }


        })


    })
}

export default setupSocket

