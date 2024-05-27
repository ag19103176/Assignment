const express = require("express");
const router = express.Router();
const productSchema = require("../models/productSchema");
router.get("/pieChart", async (req, res) => {
  try {
    const { selectedMonth } = req.query;
    const startOfMonth = new Date(selectedMonth);
    const endOfMonth = new Date(
      new Date(selectedMonth).setMonth(startOfMonth.getMonth() + 1)
    );
    const pieChartData = await productSchema.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(pieChartData);
  } catch (error) {
    console.error("Error calculating pie chart data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
