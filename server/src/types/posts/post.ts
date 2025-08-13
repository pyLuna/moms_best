import { ObjectId } from "mongodb";

export interface Post {
  _id: ObjectId;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  category_id: string;
  user_id: string;
  is_deleted: boolean;
}
