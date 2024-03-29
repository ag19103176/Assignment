import React from "react";
import "./transactionTable.css";
function transactionTable({ transactions }) {
  return (
    <div className="table-container">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>${transaction.price.toFixed(2)}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>
                <img
                  src={transaction.image}
                  alt="Product"
                  className="product-image"
                />
              </td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default transactionTable;
