const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  // relating the user collection with the task model:
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Exporting this schema above as the model 'user'
module.exports = mongoose.model("task", TaskSchema);
