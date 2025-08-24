import { Router } from "express";
import { Plant } from "../models/Plant.js";

const router = Router();

/**
 * GET /api/plants
 * Query:
 *  - q: search term (name or category keyword, case-insensitive)
 *  - category: filter by a single category
 *  - page, limit: pagination (optional)
 */
router.get("/", async (req, res) => {
  try {
    const { q = "", category = "", page = 1, limit = 20 } = req.query;
    const p = Math.max(parseInt(page), 1);
    const l = Math.min(Math.max(parseInt(limit), 1), 100);

    const filters = {};
    if (q) {
      const rx = new RegExp(q, "i");
      filters.$or = [{ name: rx }, { categories: rx }];
    }
    if (category) {
      filters.categories = { $in: [new RegExp(`^${category}$`, "i")] };
    }

    const [items, total] = await Promise.all([
      Plant.find(filters).sort({ createdAt: -1 }).skip((p - 1) * l).limit(l),
      Plant.countDocuments(filters)
    ]);

    res.json({
      ok: true,
      page: p,
      limit: l,
      total,
      items
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

/**
 * POST /api/plants
 * Body: { name, price, categories (array or comma string), inStock }
 */
router.post("/", async (req, res) => {
  try {
    let { name, price, categories, inStock } = req.body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ ok: false, error: "Name is required" });
    }

    price = Number(price);
    if (Number.isNaN(price) || price < 0) {
      return res.status(400).json({ ok: false, error: "Price must be >= 0" });
    }

    if (typeof categories === "string") {
      categories = categories.split(",").map(s => s.trim()).filter(Boolean);
    }
    if (!Array.isArray(categories)) categories = [];
    categories = [...new Set(categories.map(c => c.toLowerCase()))];

    inStock = Boolean(inStock);

    const doc = await Plant.create({ name: name.trim(), price, categories, inStock });
    res.status(201).json({ ok: true, item: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

export default router;
