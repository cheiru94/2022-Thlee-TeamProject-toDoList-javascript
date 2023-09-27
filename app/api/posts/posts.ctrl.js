const Blog = require('../../models/blog');   // 생성한 모델을 불러온다.

// Blog Posting
exports.write = async (req, res) => {
  const { title, body } = req.body;

  const newPost = { title: title, body: body };

  try {
    await Blog.create(newPost);
    res.body = newPost;
  } catch (e) {
    res.status(500);
  }

  return;
};

// Get the 'id' of the post from the user and find the post.
exports.read = async (req, res) => {
  // Get post id from the user
  const { id } = req.params;

  // trying find post
  try {
    const post = await Blog.findByPk(id);

    if (!post) {
      res.status(404);
      return;
    }
    res.body = post;
  } catch (e) {
    res.status(500);
  }

  return;
};

// Remove a post
exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Blog.findByPk(id);

    if (!post) {
      res.status(404);
      return;
    }

    await post.destroy();
    res.status(404);    // No content
  } catch (e) {
    res.status(500);
  }

  return;
};

// Modify a post
exports.update = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const post = await Blog.findByPk(id);

    if (!post) {
      res.status(404);
      return;
    }

    post.title = title;
    post.body = body;

    await post.save();
    res.body = post;

  } catch (e) {
    res.status(500);
  }

  return;
};

// Get all post
exports.list = async (req, res) => {
  try {
    const posts = await Blog.findAll();
    res.body = posts;
  } catch(e) {
    res.status(500);
  }

  return;
};