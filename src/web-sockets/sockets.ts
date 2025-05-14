import { group } from 'console'
import { Server } from 'socket.io'

class SocketService {
    private _io: Server

    constructor() {
        console.log("socket server is running")
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*'
            }
        })
    }

    get io() {
        return this._io
    }

    public initListener() {
        const io = this._io;
        console.log("Server is listening");

        io.on("connect", (socket) => {
            console.log(`new socket connected with id ${socket?.id}`)


            socket.on('join-group', async ({ groupId, userId }: { groupId: string, userId: string }) => {
                socket.join(groupId);
                console.log(`user ${userId} joined the group ${groupId}`)
                io.in(groupId).emit('user-count', {
                    count: io.sockets.adapter.rooms.get(groupId)?.size
                })
                socket.on('disconnect', () => {
                    io.in(groupId).emit('user-count', {
                        count: io.sockets.adapter.rooms.get(groupId)?.size
                    })
                })
            })

            socket.on('leave-group', ({ groupId }: { groupId: string }) => {
                socket.leave(groupId)
                console.log(`user leave the group ${groupId}`)
            })

            socket.on('message', ({ message, groupId }: { message: string, groupId: string }) => {
                // console.log(`new message received -> ${message} for group ${groupId}`)
                // io.to(groupId).emit(message)
                io.in(groupId).emit('message', {
                    message
                })
            })

            socket.on('typing', ({ groupId, userId }: { groupId: string, userId: string }) => {
                socket.broadcast.to(groupId).emit('userTyping', { userId })
            })

            socket.on('stop-typing', ({ groupId, userId }: { groupId: string, userId: string }) => {
                socket.broadcast.to(groupId).emit('user-stopped-typing')
            })

            socket.on('disconnect', () => {
                console.log(`socket with id : ${socket.id} disconnected`)
            })
        })
    }
};

export default SocketService