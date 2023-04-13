import jwt from "jsonwebtoken"; // npm install jsonwebtoken
import * as env from "dotenv";
env.config();

function generate(username, role) {
  // registered claims (pre defined payload variables)
  let payloadOptions = {
    issuer: "Ducks-Chat-App",
    subject: "send and receive access token",
    expiresIn: "15m",
  };

  let payload = {
    username: username,
    role: role,
  };

  let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, payloadOptions); //sign method sign on payload&secret key, also set expires time

  return token; // synchronous, return token as string
}

function verify(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY); // verify signature and return payload
  } catch (err) {
    let verfError = new Error(); // custom verification error

    if (err.name == "JsonWebTokenError") {
      verfError.clientMessage = "Digital signing is invalid";
      verfError.serverMessage = "Token verification failed";
    }

    if (err.name == "TokenExpiredError") {
      verfError.clientMessage = "Digital signing is invalid, request new token";
      verfError.serverMessage = "Token expired";
    }

    throw verfError;
  }
}

export default { generate, verify };
