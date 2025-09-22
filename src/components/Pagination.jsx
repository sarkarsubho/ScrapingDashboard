import React from "react";

function getPageNumbers(currentPage, totalPages) {
  let pages = [];

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);

    let left = Math.max(2, currentPage - 1);
    let right = Math.min(totalPages - 1, currentPage + 1);

    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");

    pages.push(totalPages);
  }

  return pages;
}

const Pagination = ({
  currentPage,
  totalPages,
  postsPerPage,
  setPostsPerPage,
  onPageChange,
  limitOptions = [5, 10, 15, 20, 50],
}) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center gap-2 my-2 justify-center">
      <select
        className="border rounded px-2 py-1 text-sm"
        value={postsPerPage}
        onChange={(e) => setPostsPerPage(Number(e.target.value))}
      >
        {limitOptions.map((n) => (
          <option key={n} value={n}>
            {n} per page
          </option>
        ))}
      </select>
      <button
        className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {pageNumbers.map((num, idx) =>
        num === "..." ? (
          <span key={idx} className="px-2 text-gray-500 select-none">
            ...
          </span>
        ) : (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 rounded border transition-colors
              ${
                num === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"
              }
            `}
          >
            {num}
          </button>
        )
      )}
      <button
        className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
