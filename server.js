const express = require("express");
const app = express();
const db = require("./db.js");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
const initializeDatabase = require("./routes/initializeDatabase.js");
const searchEntries = require("./routes/searchEntries.js");
const statistics = require("./routes/statistics.js");
const barChart = require("./routes/barChart.js");
const pieChart = require("./routes/pieChart.js");
const combinedAll = require("./routes/combinedAll.js");
var cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  res.send("API is Running");
});
app.use("/api", initializeDatabase);
app.use("/api", searchEntries);
app.use("/api", statistics);
app.use("/api", barChart);
app.use("/api", pieChart);
app.use("/api", combinedAll);
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port port ${port} `));
