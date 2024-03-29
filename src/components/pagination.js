import React from "react";

function pagination({ currentPage, onNextPage, onPrevPage, totalPages }) {
  return (
    <div>
      <button disabled={currentPage === 1} onClick={onPrevPage}>
        Previous
      </button>

      <button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={onNextPage}
      >
        Next
      </button>
    </div>
  );
}

export default pagination;
