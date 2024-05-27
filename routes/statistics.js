const express = require("express");
const router = express.Router();
const productSchema = require("../models/productSchema");
router.get("/statistics", async (req, res) => {
  try {
    const { selectedMonth } = req.query;
    const startOfMonth = new Date(selectedMonth);
    const endOfMonth = new Date(
      new Date(selectedMonth).setMonth(startOfMonth.getMonth() + 1)
    );
    const totalSaleAmount = await productSchema.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    const totalSoldItems = await productSchema.countDocuments({
      dateOfSale: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
      sold: true,
    });

    // Calculate total number of unsold items
    const totalUnsoldItems = await productSchema.countDocuments({
      dateOfSale: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
      sold: false,
    });

    res.json({
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalUnsoldItems,
    });
  } catch (error) {
    console.error("Error calculating statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
