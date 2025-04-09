// import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_SERVER_BASEURL, {
//   transports: ["websocket"],
// });

// socket.on("connect", () => {
//   console.log("✅ Connected to Socket.io Server! Socket ID:", socket.id);
// });

// socket.on("connect_error", (error) => {
//  console.log(import.meta.env.VITE_SERVER_BASEURL);
 
//   console.error("❌ Socket Connection Error:", error.message);
// });

// // Function to register user with socket
// export const registerUser = (userId: string) => {
//   console.log(`📢 Emitting register_user event with userId: ${userId}`);
//   socket.emit("register_user", userId);
// };

// export default socket;



import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SERVER_BASEURL, {
  transports: ["websocket",'polling'],
});

// Global connect logs
socket.on("connect", () => {
  console.log(" Connected to Socket.io Server! Socket ID:", socket.id);
});

socket.on("connect_error", (error) => {
  console.log(import.meta.env.VITE_SERVER_BASEURL);
  console.error(" Socket Connection Error:", error.message);
});

//  Register user for notifications
export const registerUser = (userId: string) => {
  console.log(` Emitting register_user for notifications: ${userId}`);
  socket.emit("register_user", userId);
};


// export const registerChat = (userId: string) => {
//   console.log(` Emitting register_user for chat: ${userId}`);
//   socket.emit("register_chat", userId);
// };

export default socket;