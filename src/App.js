// App.js

import React, { useState, useEffect } from "react";
import MonthSelect from "./components/monthSelect";
import SearchInput from "./components/searchInput";
import TransactionTable from "./components/transactionTable";
import Pagination from "./components/pagination";
import "./App.css";

function App() {
  const [selectedMonth, setSelectedMonth] = useState("03");
  const [searchText, setSearchText] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [totalSaleAmount, setTotalSaleAmount] = useState(null);
  const [totalSoldItems, setTotalSoldItems] = useState(null);
  const [totalUnsoldItems, setTotalUnsoldItems] = useState(null);

  useEffect(() => {
    const delay = 2000;
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    const timeout = setTimeout(fetchTransactions, delay);
    setSearchTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, currentPage, pageSize]);

  const fetchTransactions = async () => {
    try {
      const encodedSearchText = encodeURIComponent(searchText);
      const response = await fetch(
        `http://localhost:8000/api/searchEntries?page=${currentPage}&perPage=${pageSize}&search=${encodedSearchText}`
      );
      const data = await response.json();
      setTransactions(data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (selectedMonth) {
      fetchStatistics();
    }
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/statistics?selectedMonth=2022-${selectedMonth}`
      );
      const data = await response.json();
      setTotalSaleAmount(data.totalSaleAmount);
      setTotalSoldItems(data.totalSoldItems);
      setTotalUnsoldItems(data.totalUnsoldItems);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="App">
      <h1>Transaction Dashboard</h1>
      {totalSaleAmount !== null && (
        <div className="summary-box">
          <p>Total Sale Amount: ${totalSaleAmount.toFixed(2)}</p>
          <p>Total Sold Items: {totalSoldItems}</p>
          <p>Total Unsold Items: {totalUnsoldItems}</p>
        </div>
      )}
      <label htmlFor="month-select">Select Month:</label>
      <MonthSelect selectedMonth={selectedMonth} onChange={handleMonthChange} />
      <br />
      <label htmlFor="search">Search Transaction:</label>
      <SearchInput value={searchText} onChange={handleSearchChange} />
      <div className="table-container">
        <TransactionTable
          transactions={transactions}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
        <div className="pagination">
          <Pagination
            currentPage={currentPage}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
          <span className="page-entries">Page No {currentPage}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
