type Users = "read:users" | "write:users" | "update:users";
type Posts = "read:posts" | "write:posts" | "update:posts" | "delete:posts";
type Categories =
  | "read:categories"
  | "write:categories"
  | "update:categories"
  | "delete:categories";
type Comments =
  | "read:comments"
  | "write:comments"
  | "update:comments"
  | "delete:comments";
type Likes = "read:likes" | "write:likes" | "update:likes" | "delete:likes";
type Chats = "read:chats" | "write:chats" | "update:chats" | "delete:chats";
type Products =
  | "read:products"
  | "write:products"
  | "update:products"
  | "delete:products";

type GuestPermissions =
  | "read:posts"
  | "read:comments"
  | "read:likes"
  | "read:products";

type AdminPermissions =
  | Users
  | Posts
  | Comments
  | Likes
  | Chats
  | Products
  | Categories;
type SellerPermissions =
  | Posts
  | Comments
  | Likes
  | Products
  | Chats
  | Omit<Categories, "delete:categories" | "write:categories">;
type UserPermissions =
  | Posts
  | Comments
  | Likes
  | Chats
  | Omit<Categories, "delete:categories" | "write:categories">
  | "read:products"
  | "update:products";

export type ServerPermissions =
  | AdminPermissions
  | SellerPermissions
  | UserPermissions
  | GuestPermissions;
