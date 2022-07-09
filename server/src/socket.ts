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
            client.to(rid).emit('receive_join_room', { uid, rid })
        })

        client.on('send_leave_room', ({ uid, rid }) => {
            client.leave(rid);
            client.to(rid).emit('receive_leave_room', { uid, rid })
        })

        client.on('send_message', ({ message, rid }) => {
            client.to(rid).emit('receive_message', { message, rid })
        })


    })
}

export default setupSocket

