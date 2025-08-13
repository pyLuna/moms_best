import { ObjectId } from "mongodb";
import { POSTS } from "../../mongo_db/collections";
import query from "../../mongo_db/query";
import { Post } from "../../types/posts/post";
import PostMetadataService from "./post.metadata";

export default class PostService {
  async _togglePostDeletion(
    postId: string,
    isDeleted: boolean
  ): Promise<boolean> {
    const response = await query<boolean>({
      collection_name: POSTS,
      queryFn: async (posts) => {
        const result = await posts.updateOne(
          { _id: new ObjectId(postId) },
          { $set: { is_deleted: isDeleted } }
        );
        if (result.modifiedCount === 0) {
          throw "Failed to toggle post deletion";
        }

        return result.acknowledged;
      },
    });

    return response as boolean;
  }

  async createPost(postData: Post): Promise<Post> {
    const metadataService = new PostMetadataService();
    const response = await query({
      collection_name: POSTS,
      queryFn: async (posts) => {
        const result = await posts.insertOne(postData);
        if (!result.acknowledged) {
          throw "Failed to create post";
        }

        metadataService.createPostMetadata(result.insertedId.toString(), {
          views: 0,
          likes: 0,
          comments: 0,
        });

        return result.insertedId;
      },
    });

    return response as Post;
  }

  async getPostsByCategoryId(categoryId: string): Promise<Post[]> {
    const response = await query({
      collection_name: POSTS,
      queryFn: async (posts) => {
        return await posts
          .find({ category_id: categoryId, is_deleted: false })
          .toArray();
      },
    });

    return response as Post[];
  }

  async getPostById(postId: string): Promise<Post | null> {
    const response = await query({
      collection_name: POSTS,
      queryFn: async (posts) => {
        return await posts.findOne({
          _id: new ObjectId(postId),
          is_deleted: false,
        });
      },
    });

    return response as Post | null;
  }

  async updatePost(
    postId: string,
    updateData: Partial<Post>
  ): Promise<Post | null> {
    const response = await query({
      collection_name: POSTS,
      queryFn: async (posts) => {
        const result = await posts.updateOne(
          { _id: new ObjectId(postId) },
          { $set: updateData }
        );
        if (result.modifiedCount === 0) {
          throw "Failed to update post";
        }
        return await posts.findOne({ _id: new ObjectId(postId) });
      },
    });

    return response as Post | null;
  }

  async deletePost(postId: string): Promise<boolean> {
    const response = await this._togglePostDeletion(postId, true);
    if (!response) {
      throw "Failed to delete post";
    }

    return response as boolean;
  }

  async restorePost(postId: string): Promise<boolean> {
    const response = await this._togglePostDeletion(postId, false);
    if (!response) {
      throw "Failed to restore post";
    }

    return response as boolean;
  }
}
