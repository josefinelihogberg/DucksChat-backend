import express from "express";
import {
  fetchAllBroadcast,
  fetchAllChannels,
  deleteChannel,
  getChannelMessages,
} from "../service/chatService.js";
import adminFilter from "../filter/adminFilter.js";
import userFilter from "../filter/userFilter.js";
import socketService from "../service/socketService.js";

const router = express.Router();

// Socket applied of broadcasting a new channel created
router.put("/channel/", userFilter.authorize, (request, response) => {
  socketService.broadcast(
    "public",
    `A new channel "${request.body.subject}" has been created!`
  );
  response.sendStatus(200);
});

// Socket applied to broadcast emergency message
router.post("/broadcast", adminFilter.authorize, (request, response) => {
  socketService.broadcast(
    "emergency",
    `Emergency Message: ${request.body.message}`
  );
  response.sendStatus(200);
});

// Socket applied to broadcast a new message in the channel
router.post("/channel/:id", userFilter.authorize, (request, response) => {
  // const channelId = request.params.id;
  const message = {
    sender: request.body.sender,
    content: request.body.content,
  };

  socketService.broadcast("message", message);
  response.sendStatus(200);
});

// Fetch all messages in broadcast channel from Mongodb
router.get("/broadcast", async (request, response) => {
  const broadcasts = await fetchAllBroadcast();
  response.send(broadcasts);
});

// Fetch a list of annonserade channels from Mongodb
router.get("/channel", async (request, response) => {
  const channels = await fetchAllChannels();
  response.send(channels);
});

// Get all messages in a specific channel from Mongodb
router.get("/channel/:id", userFilter.authorize, async (request, response) => {
  let channelId = request.params.id;
  let messages = await getChannelMessages(channelId);

  response.send(messages);
});

// delete a channel which is stored in Mongodb
router.delete(
  "/channel/:id",
  userFilter.authorize,
  async (request, response) => {
    let channelId = request.params.id;
    await deleteChannel(channelId);
    const responseData = {
      content: channelId,
      event: "Deleted a channel with Id: " + channelId,
    };
    response.send(responseData);
  }
);

// The following three end points are replaced by socket.io
/*
router.post("/broadcast", adminFilter.authorize, async (request, response) => {
  let broadcast = request.body;
  if (broadcast.title == undefined) {
    response.status(400);
    response.send("Title was not found"); // bad request (expected a broadcast title)
  } else {
    await saveBroadcast(broadcast);

    const responseData = {
      content: broadcast,
      event: "Created new broadcast",
    };
    response.send(responseData);
  }
});
*/

// Create a channel
/*
router.put("/channel", userFilter.authorize, async (request, response) => {
  let channel = request.body;
  const result = await saveChannel(channel);

  const responsData = {
    content: channel,
    event: "Created new channel",
  };

  response.send(responsData);
});
*/

// create message in a specific channel
/*
router.post("/channel/:id", userFilter.authorize, async (request, response) => {
  const channelId = request.params.id;
  const message = {
    sender: request.body.sender,
    content: request.body.content,
  };

  const result = await createMessage(channelId, message);
  console.log(result);

  const responseData = {
    content: message,
    event: "Created a new message for channel: " + channelId,
  };

  response.send(responseData);
});
*/

export default router;
