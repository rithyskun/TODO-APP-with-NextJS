import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

const NEXT_PUBLIC_HOSTNAME: string = (process.env.NEXT_PUBLIC_HOSTNAME) as string

let socket: Socket | undefined

export const socketConnection = () => {
  socket = io(NEXT_PUBLIC_HOSTNAME)
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
