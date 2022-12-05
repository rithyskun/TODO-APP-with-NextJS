import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

let socket: Socket | undefined

export const socketConnection = () => {
  socket = io("http://localhost:4001")
}

export const socketDisconnected = () => {
  if (socket) {
    socket.disconnect()
  }
}

export const socketEmit = (eventName: string, payload: any) => {
  socket?.emit(eventName, payload)
}

export const socketOn = (event: string, payload: any) => {
  socket?.on(event, payload)
}
