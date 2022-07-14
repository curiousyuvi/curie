import { Server } from "socket.io";
import idFromDate from "./helpers/idFromDate";
import sendMessage from "./services/sendMessage";

const setupSocket = (server, corsOptions) => {
    const io = new Server(server, {
        cors: corsOptions
    })

    io.on('connect', (client) => {
        console.log('user connected with id ' + client.id)

        client.on('disconnect', () => {
            console.log('user disconnected ' + client.id)
        })

        client.on('send_join_room', ({ uid, rid }) => {
            client.join(rid);
            console.log(`user: ${uid} joined room : ${rid}`)
            client.to(rid).emit('receive_join_room', { uid, rid })
        })

        client.on('send_leave_room', ({ uid, rid }) => {
            client.leave(rid);
            console.log(`user: ${uid} left room : ${rid}`)
            client.to(rid).emit('receive_leave_room', { uid, rid })
        })

        client.on('send_message', ({ message, rid }) => {
            client.to(rid).emit('receive_message', { rid, message })
        })

        client.on('send_play_pause', ({ uid, rid, play }) => {
            client.to(rid).emit('receive_play_pause', { uid, rid, play })
        })

        client.on('send_play_track', ({ uid, rid, track }) => {
            client.emit('receive_play_track', { uid, rid, track })
            client.to(rid).emit('receive_play_track', { uid, rid, track })
            client.emit('receive_message', { rid, message: { mid: idFromDate(new Date()), type: "music", content: JSON.stringify(track), sender: uid } })
            client.to(rid).emit('receive_message', { rid, message: { mid: idFromDate(new Date()), type: "music", content: JSON.stringify(track), sender: uid } })
            sendMessage(rid, { type: "music", content: JSON.stringify(track), sender: uid }, err => {
                console.error('error in sending message: ', err)
            });
        })

    })
}

export default setupSocket

