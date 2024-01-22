const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// CREATE A POST
router.post("/", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// UPDATE A POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (req.body.userId === post.userId || req.body.isAdmin) {
      await post.updateOne({
        $set: req.body,
      });

      return res.status(200).json("Post has been updated");
    } else {
      return res.status(403).json("you can update only your posts!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// DELETE A POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (req.body.userId === post.userId || req.body.isAdmin) {
      await post.delete();
      return res.status(200).json("your post has been deleted successfully!");
    } else {
      return res.status(403).json("you can delete only your posts!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// LIKE A POST
router.put("/:id/like", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        $push: { likes: req.body.userId },
      });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({
        $pull: { likes: req.body.userId },
      });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

// GET A POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// GET TIMELINE POSTS
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    return res.status(500).json(error);
  }
});

// GET USERS ALL POSTS
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    console.log(user);
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
