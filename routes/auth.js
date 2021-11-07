// Routes for application authorizations
const express = require("express");

// Creating router
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// '/' is referring to 'api/auth'

// Route type: GET '/'
// Route description: get a logged in user's info
// Route access: Restricted Access
router.get("/", auth, async (req, res) => {
  try {
    // Getting the user by their id (not returning their password)
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
});

// Route type: POST '/'
// Route description: log in a user and give them a token to access restricted routes
// Route access: Public access
router.post(
  "/",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "password is required").exists(),
  ],
  async (req, res) => {
    const requestResult = validationResult(req);
    if (!requestResult.isEmpty()) {
      return res.status(400).json({ errors: requestResult.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ msg: "invalid credentials" });
      }

      // Checking if input password matches password set by the user
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
