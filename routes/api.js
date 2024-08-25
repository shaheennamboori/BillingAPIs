import { Router } from "express";
import Food from "../models/Food.js";
import Category from "../models/Category.js";
import Table from "../models//Table.js";
import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";

const router = Router();

/**
 * @openapi
 * '/api/foods':
 *  get:
 *     tags:
 *     - Food Controller
 *     summary: Get all food items
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/foods", async (req, res) => {
  try {
    const items = await Food.find().populate("category");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @openapi
 * '/api/food':
 *  post:
 *     tags:
 *     - Food Controller
 *     summary: Create a food item
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - categoryId
 *              - cost
 *              - description
 *            properties:
 *              name:
 *                type: string
 *                default: food1
 *              categoryId:
 *                type: string
 *                default: categoryID
 *              cost:
 *                type: number
 *                default: 10
 *              description:
 *                type: string
 *                default: description
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/food", async (req, res) => {
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

/**
 * @openapi
 * '/api/categories':
 *  get:
 *     tags:
 *     - Category Controller
 *     summary: Get all categories
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *        content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the food item.
 *                   name:
 *                     type: string
 *                     description: The name of the food item.
 *                   category:
 *                     type: object
 *                     description: The category to which the food item belongs.
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier for the category.
 *                       name:
 *                         type: string
 *                         description: The name of the category.
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @openapi
 * '/api/category':
 *  post:
 *     tags:
 *     - Category Controller
 *     summary: Create a category
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                default: category1
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
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

/**
 * @openapi
 * '/api/tables':
 *  get:
 *     tags:
 *     - Table Controller
 *     summary: Get all tables
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/tables", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

/**
 * @openapi
 * '/api/orders':
 *  get:
 *     tags:
 *     - Order Controller
 *     summary: Get all orders
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
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
