import { Router } from "express";
import { authorize } from "../middleware/verify/api.key";
import CategoryService from "../service/category";
import Route from "../utils/route";

const router = Router();

router.get(
  Route.category.get.all,
  authorize("read:categories"),
  async (req, res) => {
    const categoryService = new CategoryService();

    try {
      const categories = await categoryService.getAllCategories();
      res.send(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).send({ error: "Failed to fetch categories." });
    }
  }
);

router.get(
  Route.category.get.from,
  authorize("read:categories"),
  async (req, res) => {
    const { from } = req.query;
    const categoryService = new CategoryService();
    try {
      const categories = await categoryService.getCategoryFrom(from as string);
      res.send(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).send({ error: "Failed to fetch categories." });
    }
  }
);

router.get(
  Route.category.get.byId,
  authorize("read:categories"),
  async (req, res) => {
    const { id } = req.params;

    const categoryService = new CategoryService();

    try {
      const category = await categoryService.getCategory(id);
      res.send(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(404).send({ error: error });
    }
  }
);

router.post(
  Route.category.create,
  authorize("write:categories"),
  async (req, res) => {
    const categoryService = new CategoryService();
    const categoryData = req.body;

    try {
      const newCategory = await categoryService.createCategory(categoryData);
      res.status(201).send(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(400).send({ error: error as string });
    }
  }
);

router.put(
  Route.category.update,
  authorize("update:categories"),
  async (req, res) => {
    const { id } = req.params;
    const categoryService = new CategoryService();
    const updateData = req.body;

    try {
      const updatedCategory = await categoryService.updateCategory(
        id,
        updateData
      );
      res.send(updatedCategory);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(404).send({ error: error });
    }
  }
);

router.delete(
  Route.category.delete,
  authorize("delete:categories"),
  async (req, res) => {
    const { id } = req.params;
    const categoryService = new CategoryService();

    try {
      await categoryService.deleteCategory(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(404).send({ error: error });
    }
  }
);

router.post(
  Route.category.restore,
  authorize("update:categories"),
  async (req, res) => {
    const { id } = req.params;
    const categoryService = new CategoryService();

    try {
      const restoredCategory = await categoryService.restoreCategory(id);
      res.send(restoredCategory);
    } catch (error) {
      console.error("Error restoring category:", error);
      res.status(404).send({ error: error });
    }
  }
);
export default router;
