import { Router } from "express";
import { authorize } from "../middleware/verify/api.key";
import PostService from "../service/posts/post";
import Route from "../utils/route";

const router = Router();

router.post(Route.post.create, authorize("create:posts"), async (req, res) => {
  const postData = req.body;
  const postService = new PostService();
  try {
    const newPost = await postService.createPost(postData);
    res.status(201).send(newPost);
  } catch (error) {
    res.status(500).send({ error: "Failed to create post" });
  }
});

router.get(Route.post.get.byId, authorize("read:posts"), async (req, res) => {
  const postId = req.params.id;
  const postService = new PostService();
  try {
    const post = await postService.getPostById(postId);
    if (!post) {
      res.status(404).send({ error: "Post not found" });
      return;
    }
    res.send(post);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve post" });
  }
});

router.get(
  Route.post.get.byCategory,
  authorize("read:posts"),
  async (req, res) => {
    const categoryId = req.params.category_id;
    const postService = new PostService();
    try {
      const posts = await postService.getPostsByCategoryId(categoryId);
      res.send(posts);
    } catch (error) {
      res.status(500).send({ error: "Failed to retrieve posts by category" });
    }
  }
);

router.post(
  Route.post.restore,
  authorize("restore:posts"),
  async (req, res) => {
    const postId = req.params.id;
    const postService = new PostService();
    try {
      const success = await postService.restorePost(postId);
      if (!success) {
        res.status(404).send({ error: "Post not found or already restored" });
        return;
      }
      res.send({ message: "Post restored successfully" });
    } catch (error) {
      res.status(500).send({ error: "Failed to restore post" });
    }
  }
);

router.put(Route.post.update, authorize("update:posts"), async (req, res) => {
  const postId = req.params.id;
  const postData = req.body;
  const postService = new PostService();
  try {
    const updatedPost = await postService.updatePost(postId, postData);
    if (!updatedPost) {
      res.status(404).send({ error: "Post not found" });
      return;
    }
    res.send(updatedPost);
  } catch (error) {
    res.status(500).send({ error: "Failed to update post" });
  }
});

router.delete(
  Route.post.delete,
  authorize("delete:posts"),
  async (req, res) => {
    const postId = req.params.id;
    const postService = new PostService();
    try {
      const success = await postService.deletePost(postId);
      if (!success) {
        res.status(404).send({ error: "Post not found" });
        return;
      }
      res.send({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).send({ error: "Failed to delete post" });
    }
  }
);
