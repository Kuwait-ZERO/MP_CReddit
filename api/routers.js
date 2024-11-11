const express = require("express");
const {
  postAll,
  deletePost,
  createPost,
  addComment,
  deleteComment,
  postFind,
} = require("./controller");
const router = express.Router();

router.get("/", postAll);
router.get("/:id", postFind);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.post("/:id/comments", addComment);
router.delete("/comments/:id", deleteComment);

module.exports = router;
