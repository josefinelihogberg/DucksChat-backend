import { fetchCollection } from "../mongo/chatMongoClient.js";

// Save emergency message to broadcast channel
export function saveBroadcast(broadcast) {
  const data = {
    title: broadcast.title,
    content: broadcast.content,
  };

  return fetchCollection("broadcast").insertOne(data);
}

// Fetch all messages from broadcast channel
export function fetchAllBroadcast() {
  const projection = { title: 1, content: 1, _id: 0 };
  return fetchCollection("broadcast").find().project(projection).toArray();
}

// Create a new commercial channel
export function saveChannel(channel) {
  const data = {
    id: channel.id,
    subject: channel.subject,
    messages: [],
  };

  return fetchCollection("channel").insertOne(data);
}

// Fetch a list of commercial channels
export function fetchAllChannels() {
  const projection = { subject: 1, _id: 0 };
  return fetchCollection("channel").find().project(projection).toArray();
}

// Delete a channel
export function deleteChannel(channelId) {
  return fetchCollection("channel").deleteOne({ id: channelId });
}

// Create a message to a specific channel
export function createMessage(channelId, message) {
  const data = {
    sender: message.sender,
    content: message.content,
    date: new Date(),
  };

  return fetchCollection("channel").updateOne(
    { id: channelId },
    { $push: { messages: data } }
  );
}

// Fetch all messages from a specific channel
export function getChannelMessages(channelId) {
  return fetchCollection("channel")
    .aggregate([
      {
        $match: { id: channelId },
      },
      {
        $project: {
          _id: 0,
          messages: 1,
        },
      },
    ])
    .toArray()
    .then((result) => {
      return result[0].messages;
    });
}
