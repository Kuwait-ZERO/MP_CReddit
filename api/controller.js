const uuid4 = require("uuid4");
const posts = require("../posts");

const postAll = (request, response) => {
  const { title } = request.query;
  if (title)
    response.json(
      posts.filter((post) =>
        post.title.toLowerCase().includes(title.toLowerCase())
      )
    );
  else response.status(200).json(posts);
};

const postFind = (request, response) => {
  const { id } = request.params;

  const foundPost = posts.find(
    (post) => post.id.toLowerCase() === id.toLowerCase()
  );

  if (!foundPost) {
    return response
      .status(404)
      .json({ message: `Post with ID ${id} not found` });
  }

  response.status(200).json(foundPost);
};

const createPost = (request, response) => {
  const { title, description } = request.body;

  if (!title || typeof title !== "string") {
    return response
      .status(400)
      .json({ message: "The 'title' field is required and must be a string." });
  }
  if (!description || typeof description !== "string") {
    return response.status(400).json({
      message: "The 'description' field is required and must be a string.",
    });
  }

  const newPost = {
    id: uuid4(),
    title,
    description,
    comments: [],
  };
  posts.unshift(newPost);
  response.status(201).json(newPost);
};

const deletePost = (request, response) => {
  const { id } = request.params;

  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) {
    return response
      .status(404)
      .json({ message: `Post with ID ${id} not found` });
  }

  posts.splice(postIndex, 1);

  response.status(200).json({ message: "Post has been deleted successfully" });
};

const addComment = (request, response) => {
  const { id } = request.params;
  const { username, comment } = request.body;

  if (!username || typeof username !== "string") {
    return response.status(400).json({
      message: "The 'username' field is required and must be a string.",
    });
  }
  if (!comment || typeof comment !== "string") {
    return response.status(400).json({
      message: "The 'comment' field is required and must be a string.",
    });
  }

  const foundPost = posts.find((post) => post.id === id);

  if (!foundPost) {
    return response.status(404).json({ message: "Post not found" });
  }
  const newComment = {
    id: uuid4(),
    comment,
    username,
  };

  foundPost.comments.push(newComment);
  response.status(201).json(newComment);
};

const deleteComment = (request, response) => {
  const { id } = request.params;
  let commentFound = false;

  for (let post of posts) {
    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === id
    );

    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1);
      commentFound = true;
      break;
    }
  }

  if (!commentFound) {
    return response.status(404).json({ message: "Comment not found" });
  }

  response
    .status(200)
    .json({ message: "Comment has been deleted successfully" });
};

module.exports = {
  postAll,
  deletePost,
  createPost,
  postFind,
  addComment,
  deleteComment,
};
