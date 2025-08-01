# Category

Categories will be used in different part, `posts`, `products` and `ai-chats` (tentative)

This type is the structure of Category document

```ts
interface Category {
  _id: ObjectId;
  category: string;
  sub_category: string;
  count: number; // number of the posts/products
  created_at: Date;
}
```
