// Routes for User components
const express = require("express");

// Creating router
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Importing functions from express-validator to validate registration info
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// '/' is referring to 'api/users'
// Route type: POST
// Route description: register a user by sending data to api/users
// Route access: Public access (not restricted to users who aren't signed in)
router.post(
  "/",
  [
    check("name", "please add a name").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "password",
      "please enter a password with less than 128 characters"
    ).isLength({ max: 128 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ msg: "email is already associated with a user" });
      }

      // If user doesn't already exist, create User object
      user = new User({
        name: name,
        email: email,
        password: password,
      });

      // hashing user's password using bcrypt and then saving user to database
      const saltRounds = 10;
      await bcrypt.genSalt(saltRounds).then(async (salt) => {
        user.password = await bcrypt.hash(password, salt);
        // res.send(user.password);
        await user.save();
      });

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
      res.status(500).send("server error occurred");
    }
  }
);

module.exports = router;
