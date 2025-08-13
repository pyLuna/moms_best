import { POST_METADATA } from "../../mongo_db/collections";
import query from "../../mongo_db/query";

export default class PostMetadataService {
  async getPostMetadata(postId: string) {
    const response = await query({
      collection_name: POST_METADATA,
      queryFn: async (collection) => {
        return await collection.findOne({ post_id: postId });
      },
    });
    return response;
  }

  async createPostMetadata(postId: string, metadata: any) {
    const response = await query({
      collection_name: POST_METADATA,
      queryFn: async (collection) => {
        return await collection.insertOne({
          post_id: postId,
          ...metadata,
        });
      },
    });
    return response;
  }

  async updatePostMetadata(postId: string, metadata: any) {
    const response = await query({
      collection_name: POST_METADATA,
      queryFn: async (collection) => {
        return await collection.updateOne(
          { post_id: postId },
          { $set: metadata }
        );
      },
    });
    return response;
  }
}
