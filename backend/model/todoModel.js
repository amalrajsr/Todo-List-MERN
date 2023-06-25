const mongoose = require("mongoose");

const todoModel = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  todos: [
    {
      task: { type: String, required: true },
      status: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model("todo", todoModel);
