const { User, Thought } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughData) => res.json(dbThoughData))
      .catch((err) => res.status(400).json(err));
  },

  // get thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughData) => {
        if (!dbThoughData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // add thought to user
  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughData) => {
        if (!dbThoughData) {
          res.status(404).json({ message: "No user found with this username" });
          return;
        }
        res.json(dbThoughData);
      })
      .catch((err) => res.json(err));
  },

  //   add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    ).then((dbThoughData) => {
      if (!dbThoughData) {
        res.status(404).json({ message: "No thought found with this id" });
        return;
      }
      res.json(dbThoughData);
    });
  },
  //   update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((dbThoughData) => {
        if (!dbThoughData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //   delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughData) => {
        if (!dbThoughData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //   delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      //   remove reaction by its _id from the reactions array under thought
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughData) => {
        if (!dbThoughData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
