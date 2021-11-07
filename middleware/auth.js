const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // The token can be found in the "x-auth-token" portion of the HTTP header when making a request
  const token = req.header("x-auth-token");

  // If the token does not exist, return 401 error message (401 meaning that user is not authenticated)
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }

  try {
    // Verifying the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Assigning the user that's in the request to be the user decoded from the token
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
