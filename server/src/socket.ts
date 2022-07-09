import { Server } from "socket.io";

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

        client.on('send_next', ({ uid, rid }) => {
            client.to(rid).emit('receive_next', { uid, rid })
        })

        client.on('send_previous', ({ uid, rid }) => {
            client.to(rid).emit('receive_previous', { uid, rid })
        })

        client.on('send_play_track', ({ uid, rid, trackUri }) => {
            client.to(rid).emit('receive_play_track', { uid, rid, trackUri })
        })

        client.on('send_add_to_queue', ({ uid, rid, trackUri }) => {
            client.to(rid).emit('receive_add_to_queue', { uid, rid, trackUri })
        })

    })
}

export default setupSocket

