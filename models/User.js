const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: "Please provide a username.",
    trim: true,
  },
  email: {
    type: String,
    required: "Please provide an email address.",
    unique: true,
    match: [/.+@.+\..+/, "Please provide a vailid email address."],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
});

const User = model("user", UserSchema);

module.exports = User;
