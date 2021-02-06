const { User, Thought } = require("../models");

const userController = {
  // setup method as callback functions for the routes

  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")

      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //   get user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        console.log(dbUserData.thoughts);
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //   create a user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //   update a user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //   delete user by id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        } else {
          // resolving the find user and delete promise
          res.json(dbUserData);
          //   iterating through the toughts array and deleteing each user's thought by id
          dbUserData.thoughts.forEach((thoughtId) => {
            Thought.findOneAndDelete({ _id: thoughtId }).then((dbThougtData) => {
              return dbThougtData;
            });
          });
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  //   add a new friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: { _id: req.params.friendId } } },
      { new: true, runValidators: true }
    )
      .then((dbFriendData) => {
        if (!dbFriendData) {
          res.status(404).json({ message: "no user found with this id" });
          return;
        }
        console.log(dbFriendData);
        res.json(dbFriendData);
      })
      .catch((err) => res.json(err));
  },

  //   remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      // remove friend's id from friends array under user
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbFriendData) => {
        if (!dbFriendData) {
          res.status(404).json({ message: "No user found with thid id!" });
          return;
        }
        console.log(dbFriendData);
        res.json(dbFriendData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
