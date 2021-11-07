//entry point to our backend
const express = require("express");
//const connectDB = require("./config/db");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

const app = express();

//importing the database URI in the default.json file
const db = config.mongoURI;

// Function to connect to the database
const connectDB = async () => {
  try {
    mongoose
      .connect(db, {})
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => {
        console.error(err.message);
        process.exit(1);
      });
  } catch (err) {
    //print error message if unable to connect to database
    console.error(err.message);
  }
};
connectDB();

// Init Middleware (this line allows us to accepts the req.body data)
app.use(express.json({ extended: false }));

// Home route
// app.get("/", (req, res) => res.json({ msg: "Task Manager MERN App API" }));

// Defining routes for the app components
// First parameter is the text for the route, second parameter is specifying which file will be required
app.use("/api/users", require("./routes/users"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/auth", require("./routes/auth"));

// Production server:
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
