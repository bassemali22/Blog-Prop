import React from "react";
import "./pagination.css";
const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatedPage = [];
  for (let i = 1; i < pages; i++) {
    generatedPage.push(i);
  }
  console.log(pages);

  return (
    <div className="pagination">
      <button
        className="page previous"
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {generatedPage.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          key={page}
          className={currentPage == page ? "page active" : "page"}
        >
          {page}
        </div>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="page next"
        disabled={currentPage === pages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
