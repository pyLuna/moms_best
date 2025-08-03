export interface Category {
  _id?: string;
  category_id: string;
  category_name: string;
  from: "product" | "forum" | "report";
  count: number;
  is_deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
