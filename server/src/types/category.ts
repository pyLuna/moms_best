import { ObjectId } from "mongodb";

type CategoryFrom = "product" | "forum" | "report";

interface Category {
  _id?: ObjectId;
  category_id: string;
  from: CategoryFrom;
  title: string;
  count: number;
  is_deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type { Category };
