const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
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
      match: [/.+@.+\..+/, "Please provide a valid email address."],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // disabling extra 'id' in virtual
    id: false,
  }
);

// get count of friends per user
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
