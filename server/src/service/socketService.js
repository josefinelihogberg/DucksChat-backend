import { Server } from "socket.io";

const options = {
  cors: {
    origin: "*",
  },
};

let io = undefined;

function handleNewConnection(clientSocket) {
  console.log("a user connected with id: " + clientSocket.id);

  clientSocket.on("disconnect", () => {
    console.log("user disconnected with id: " + clientSocket.id);
  });

  // Waiting for emit from client: msg is from clientSocket.emit
  clientSocket.on("chat message", (msg) => {
    broadcast("chat message", `${msg.username}: ${msg.chatMessage}`); // From server to all the client sockets that connected to it
  });

  clientSocket.on("join message", (msg) => {
    broadcast("join message", `${msg.username} joined ${msg.channel} channel.`);
  });
}

function broadcast(channel, message) {
  io.emit(channel, message); //broadcast to all on the socket server
}

function attach(container) {
  io = new Server(container, options);
  io.on("connection", handleNewConnection);
}

export default { broadcast, attach };
