const express = require("express");
const router = express.Router();
const productSchema = require("../models/productSchema");
router.get("/searchEntries", async (req, res) => {
  try {
    const { page = 1, perPage = 5, search = "" } = req.query;
    const searchTextRegex = new RegExp(search, "i");
    const transactionsQuery = productSchema.find({
      $or: [
        { title: searchTextRegex },
        { description: searchTextRegex },
        { price: parseFloat(search) || 0 },
      ],
    });

    const totalDocs = await productSchema.countDocuments({
      $or: [
        { title: searchTextRegex },
        { description: searchTextRegex },
        { price: parseFloat(search) || 0 },
      ],
    });

    const transactions = await transactionsQuery
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .exec();

    res.json({
      totalDocs,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
