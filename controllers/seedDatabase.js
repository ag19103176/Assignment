const ProductTransaction = require("../models/productSchema");

async function seedDatabase() {
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    console.log(response);
    const jsonData = await response.json();
    // await ProductTransaction.deleteMany();
    await ProductTransaction.insertMany(jsonData);

    console.log("Database seeded successfully.");
  } catch (err) {
    console.log(err);
  }
}
module.exports = seedDatabase;
