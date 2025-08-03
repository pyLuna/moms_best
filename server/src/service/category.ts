import { CATEGORIES } from "../mongo_db/collections";
import query from "../mongo_db/query";
import { Category } from "../types/category";

export default class CategoryService {
  constructor() {}

  async _toggleCategoryDeletion(category_id: string, is_deleted: boolean) {
    try {
      const result = query({
        collection_name: CATEGORIES,
        queryFn: async (collection) => {
          const category = await collection.findOne({
            category_id: category_id,
          });
          if (!category) {
            throw "Category not found";
          }
          const updatedCategory = { ...category, is_deleted };
          await collection.updateOne(
            { category_id: category_id },
            { $set: updatedCategory }
          );
          return updatedCategory;
        },
      });
      return result;
    } catch (error) {
      console.error("Error toggling category deletion:", error);
      throw error as string;
    }
  }

  async createCategory(data: Category) {
    try {
      const result = query({
        collection_name: CATEGORIES,
        queryFn: async (collection) => {
          const existingCategory = await collection.findOne({
            category_id: data.category_id,
          });
          if (existingCategory) {
            throw "Category already exists";
          }
          const result = await collection.insertOne(data);
          return result;
        },
      });
      return result;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error as string;
    }
  }

  async getAllCategories() {
    const result = query({
      collection_name: CATEGORIES,
      queryFn: async (collection) => {
        const categories = await collection.find({}).toArray();
        return categories;
      },
    });
    return result;
  }

  async getCategory(category_id: string) {
    try {
      const result = query({
        collection_name: CATEGORIES,
        queryFn: async (collection) => {
          const category = await collection.findOne({
            category_id: category_id,
          });
          if (!category) {
            throw "Category not found";
          }
          return category;
        },
      });
      return result;
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error as string;
    }
  }

  async updateCategory(category_id: string, data: Partial<Category>) {
    try {
      delete data._id; // Ensure _id is not included in the update
      delete data.created_at; // Ensure created_at is not included in the update
      delete data.is_deleted;
      delete data.updated_at;

      data.updated_at = new Date(); // Set updated_at to current date

      const result = query({
        collection_name: CATEGORIES,
        queryFn: async (collection) => {
          const category = await collection.findOne({
            category_id: category_id,
          });
          if (!category) {
            throw "Category not found";
          }
          const updatedCategory = { ...category, ...data };
          await collection.updateOne(
            { category_id: category_id },
            { $set: updatedCategory }
          );
          return updatedCategory;
        },
      });
      return result;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error as string;
    }
  }

  async getCategoryFrom(from: string) {
    const result = query({
      collection_name: CATEGORIES,
      queryFn: async (collection) => {
        const categories = await collection.find({ from: from }).toArray();
        return categories;
      },
    });
    return result;
  }

  async restoreCategory(category_id: string) {
    const result = this._toggleCategoryDeletion(category_id, false);
    return result;
  }

  async deleteCategory(category_id: string) {
    const result = this._toggleCategoryDeletion(category_id, true);
    return result;
  }

  async updateCount(category_id: string, count: number) {
    const result = query({
      collection_name: CATEGORIES,
      queryFn: async (collection) => {
        const category = await collection.findOne({
          category_id: category_id,
        });
        if (!category) {
          throw "Category not found";
        }
        const updatedCategory = { ...category, count: category.count + count };
        await collection.updateOne(
          { category_id: category_id },
          { $set: updatedCategory }
        );
        return updatedCategory;
      },
    });
    return result;
  }
}
