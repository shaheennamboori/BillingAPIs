import { Router } from "express";
import Food from "../models/Food.js";
import Category from "../models/Category.js";
import Table from "../models//Table.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";

const router = Router();

// GET all items
router.get("/foods", async (req, res) => {
  try {
    const items = await Food.find().populate("category");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all tables
router.get("/tables", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all order items
router.get("/order-items", async (req, res) => {
  try {
    const orderItems = await OrderItem.find()
      .populate("order")
      .populate("food");
    res.json(orderItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an order item for the given table id
router.get("/order-items/:tableId", async (req, res) => {
  try {
    const orderIds = await Order.find({ table: req.params.tableId })
      .populate("table")
      .map((t) => t._id);
    const orderItems = await OrderItem.find({ order: { $in: orderIds } })
      .populate("order")
      .populate("food");
    res.json(orderItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a category
router.post("/category", async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
    });

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a table
router.post("/table", async (req, res) => {
  try {
    const table = new Table({
      name: req.body.name,
      capacity: req.body.capacity,
    });

    const updatedTable = await table.save();
    res.json(updatedTable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST create an item within a category
router.post("/items", async (req, res) => {
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).json({ message: "Category not found" });

  const item = new Food({
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    category: req.body.categoryId,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // PUT edit an item
// router.put('/items/:id', async (req, res) => {
//     try {
//         const item = await Item.findById(req.params.id);
//         if (!item) return res.status(404).json({ message: 'Item not found' });

//         if (req.body.name) item.name = req.body.name;
//         if (req.body.description) item.description = req.body.description;
//         if (req.body.cost) item.cost = req.body.cost;
//         if (req.body.categoryId) {
//             const category = await Category.findById(req.body.categoryId);
//             if (!category) return res.status(404).json({ message: 'Category not found' });
//             item.category = req.body.categoryId;
//         }

//         const updatedItem = await item.save();
//         res.json(updatedItem);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // DELETE an item
// router.delete('/items/:id', async (req, res) => {
//     try {
//         const item = await Item.findById(req.params.id);
//         if (!item) return res.status(404).json({ message: 'Item not found' });

//         await item.remove();
//         res.json({ message: 'Item deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // PUT edit a category
// router.put('/categories/:id', async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id);
//         if (!category) return res.status(404).json({ message: 'Category not found' });

//         if (req.body.name) category.name = req.body.name;

//         const updatedCategory = await category.save();
//         res.json(updatedCategory);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // DELETE a category
// router.delete('/categories/:id', async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id);
//         if (!category) return res.status(404).json({ message: 'Category not found' });

//         const itemsInCategory = await Item.find({ category: req.params.id });
//         if (itemsInCategory.length > 0) {
//             return res.status(400).json({ message: 'Cannot delete category with items' });
//         }

//         await category.remove();
//         res.json({ message: 'Category deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

export default router;
