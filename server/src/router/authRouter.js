import express from "express";
import jwtUtil from "../util/jwtUtil.js";
import { fetchUser, saveUser } from "../service/userService.js";

const authRouter = express.Router();

// Register a new user to the chat app
authRouter.post("/auth/register", async (request, response) => {
  const { username, password } = request.body;
  if (!username || typeof username !== "string") {
    return response.status(400).send("Invalid username");
  }

  if (!password || typeof password !== "string") {
    return response.status(400).send("Invalid password");
  }

  if (password.length < 5) {
    return response
      .status(400)
      .send("Password too short. Should be at least 6 characters");
  }

  try {
    const result = await saveUser({ username, password });
    console.log("User created successfully: ", result);
  } catch (error) {
    throw error;
  }

  response.send("User created successfully!");
});

// Login the registerd user to get an access token
authRouter.post("/auth/login", async (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  if (username == undefined || password == undefined) {
    response.status(400); // bad request --> bad data format
    response.send("invalid username/password");
  } else {
    const user = await fetchUser(username, password);
    //if user not exist, null returned
    if (!user) {
      return response.status(400).send("invalid username/password");
    }
    if (user) {
      const role = user.role;
      const token = jwtUtil.generate(username, role);
      response.status(200);
      response.send(token);
    }
  }
});

export default authRouter;
