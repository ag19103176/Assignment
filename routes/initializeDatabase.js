const express = require("express");
const router = express.Router();
const productSchema = require("../models/productSchema");
router.post("/initializedatabase", async (req, res) => {
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    console.log(response);
    const jsonData = await response.json();
    await productSchema.insertMany(jsonData);
    console.log("Database seeded successfully.");
    res.status(200).json({ message: "Database initialized successfully." });
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).json({ error: "Database initialization failed." });
  }
});

module.exports = router;
