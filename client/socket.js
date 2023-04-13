const clientSocket = io("ws://127.0.0.1:6060"); //clientSocket

// Get public message of a new channel created
clientSocket.on("public", (msg) => {
  document.querySelector(".channel-info").textContent = msg;
});

// Get public message of emergency from admin
clientSocket.on("emergency", (msg) => {
  document.querySelector(".emergency-info").textContent = msg;
});

// Get chat message in the channel you are sitting in
clientSocket.on("message", (msg) => {
  const content = msg.content;
  const sender = msg.sender;
  const li = document.createElement("li");
  li.textContent = `${sender}: ${content}`;

  document.querySelector("ul").append(li);
});

// Emit chat message from client to socket server
function sendMessage() {
  const username = usernameField.value;
  const chatMessage = chatMessageInput.value;
  const message = { username, chatMessage };
  clientSocket.emit("chat message", message);
  chatMessageInput.value = " ";
}

//  Receive chat message from socket server
clientSocket.on("chat message", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  document.querySelector("ul").append(li);
});

// Emit join message from cilent to socket server
function joinMessage() {
  const username = usernameField.value;
  console.log(username);
  const channel = channelInput.value;
  const message = { username, channel };
  clientSocket.emit("join message", message);
  channelInput.value = " ";
}

// Recieve join message from socket server to client
clientSocket.on("join message", (msg) => {
  const p = document.createElement("p");
  p.textContent = msg;
  document.querySelector("ul").append(p);
});
