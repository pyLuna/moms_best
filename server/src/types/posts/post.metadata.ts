import { ObjectId } from "mongodb";

export interface PostMetadata {
  _id: ObjectId;
  post_id: string;
  views: number;
  likes: number;
  comments: number;
  created_at: Date;
  updated_at: Date;
}
