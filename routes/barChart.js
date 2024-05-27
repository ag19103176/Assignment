const express = require("express");
const router = express.Router();
const productSchema = require("../models/productSchema");
router.get("/barChart", async (req, res) => {
  try {
    const { selectedMonth } = req.query;
    const startOfMonth = new Date(selectedMonth);
    const endOfMonth = new Date(
      new Date(selectedMonth).setMonth(startOfMonth.getMonth() + 1)
    );
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const barChartData = [];
    for (const range of priceRanges) {
      const count = await productSchema.countDocuments({
        dateOfSale: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
        price: { $gte: range.min, $lte: range.max },
      });

      barChartData.push({
        priceRange: `${range.min} - ${
          range.max === Infinity ? "Above" : range.max
        }`,
        count,
      });
    }

    res.json(barChartData);
  } catch (error) {
    console.error("Error calculating bar chart data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
