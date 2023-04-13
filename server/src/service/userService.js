import { fetchCollection } from "../mongo/chatMongoClient.js";
// Save a new user
export function saveUser(user) {
  const data = {
    username: user.username,
    password: user.password,
    role: "user",
  };
  return fetchCollection("user").insertOne(data);
}

// Fetch user from database
export function fetchUser(username, password) {
  return fetchCollection("user").findOne({
    username: username,
    password: password,
  });
}
