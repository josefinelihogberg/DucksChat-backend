import jwtUtil from "../util/jwtUtil.js";

// Verify that each request has a valid jwt token
function authorize(request, response, next) {
  const authHeader = request.headers["authorization"];

  if (authHeader == undefined) {
    response.status(400); // bad request
    response.send("Authorization header is missing");
  } else {
    const authToken = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwtUtil.verify(authToken);
      if (decoded.role === "user") {
        next();
      }
    } catch (err) {
      response.status(403); // forbidden
      response.send(err.clientMessage);
    }
  }
}

export default { authorize };
