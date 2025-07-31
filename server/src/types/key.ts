import { Roles } from "../enums/roles";

export interface Key {
  _id: string;
  role: Roles;
  key: string;
  createdAt: string;
  user_id: string;
}
