import { ObjectId } from "mongodb";
import { Roles } from "../enums/roles";

export interface Key {
  _id: ObjectId;
  role: Roles;
  key: string;
  lastLoggedIn?: Date;
  createdAt: string;
  user_id: string;
}
