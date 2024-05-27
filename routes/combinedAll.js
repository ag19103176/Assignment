const express = require("express");
const router = express.Router();
router.get("/combinedAll", async (req, res) => {
  try {
    const statisticsAPI = "http://localhost:8000/api/statistics";
    const barChartAPI = "http://localhost:8000/api/barChart";
    const pieChartAPI = "http://localhost:8000/api/pieChart";
    const [statisticsResponse, barChartResponse, pieChartResponse] =
      await Promise.all([
        fetch(`${statisticsAPI}?selectedMonth=2022-03`),
        fetch(`${barChartAPI}?selectedMonth=2022-03`),
        fetch(`${pieChartAPI}?selectedMonth=2022-03`),
      ]);
    const statisticsData = await statisticsResponse.json();
    const barChartData = await barChartResponse.json();
    const pieChartData = await pieChartResponse.json();
    const combinedData = {
      statistics: statisticsData,
      barChart: barChartData,
      pieChart: pieChartData,
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching combined data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
