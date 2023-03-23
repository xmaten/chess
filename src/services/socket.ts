import { io } from "socket.io-client"

export const socket = io("http://localhost:4000", {
  autoConnect: false,
  path: "/wsapi",
  transports: ["websocket"],
  withCredentials: true
})
