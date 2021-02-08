const router = require("express").Router();
const {
  addThought,
  addReaction,
  getAllThought,
  getThoughtById,
  updateThought,
  deleteThought,
  deleteReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/").post(addThought).get(getAllThought);

// /api/thoughts/<thoughtId>
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);

// api/thoughts/<thoughtId>/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// api/thoughts/<thoughtId>/reactions/reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
