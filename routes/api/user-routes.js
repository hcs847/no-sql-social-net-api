const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

//  setup GET all and POST at /api/users
router.route("/").get(getAllUsers).post(createUser);

// GET one user by id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// add a friend to user, remove a friend from user
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
