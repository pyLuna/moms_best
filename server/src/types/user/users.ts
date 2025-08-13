import { Roles } from "../../enums/roles";

export interface User {
  _id: string;
  name?: string;
  email: string;
}

export interface UsersPrivate {
  user_id: string;
  password: string;
}

export interface UserMetadata {
  _id: string;
  user_id: string;
  createdAt: string;
  lastLogin?: string;
  role: Roles;
}
