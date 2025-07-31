import React, { useEffect, useState } from "react";
import "../styles/Pagination.css";

function Pagination({
  totalProductsCount,
  selectedPostPerPage = 10,
  handlePageChange,
}) {
  const postsPerPage = selectedPostPerPage || 10;
  const pages = Math.ceil(totalProductsCount / postsPerPage);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    handlePageChange(curPage);
  }, [curPage]);

  return (
    <div className="pagination-page">
      <button
        className="page-button"
        disabled={curPage === 1}
        onClick={() => setCurPage(curPage - 1)}
      >
        Prev
      </button>
      {[...Array(pages)].map((_, i) => {
        const currentPage = i + 1;
        return (
          <button
            key={currentPage}
            className={`page-button${curPage === currentPage ? " active" : ""}`}
            style={{
              margin: "0 4px",
              padding: "6px 12px",
              border:
                curPage === currentPage
                  ? "2px solid #007bff"
                  : "1px solid #ccc",
              backgroundColor: curPage === currentPage ? "#007bff" : "#fff",
              color: curPage === currentPage ? "#fff" : "#333",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: curPage === currentPage ? "bold" : "normal",
            }}
            onClick={() => setCurPage(currentPage)}
          >
            {currentPage}
          </button>
        );
      })}
      <button
        className="page-button"
        disabled={curPage === pages}
        onClick={() => setCurPage(curPage + 1)}
      >
        next
      </button>
    </div>
  );
}

export default Pagination;
