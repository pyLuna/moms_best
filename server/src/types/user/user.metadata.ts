import { ObjectId } from "mongodb";
import { Roles } from "../../enums/roles";

export interface Metadata {
  _id: ObjectId;
  role: Roles;
  key?: string;
  last_logged_in?: Date;
  created_at: Date;
  user_id: string;
  online: boolean;
}
