import React from 'react';

interface PaginationProps {
  totalProducts: number; // The total number of products available
  productsPerPage: number; // The number of products displayed per page
  currentPage: number; // The current active page
  setCurrentPage: (page: number) => void; // Function to update the active page
}

const Pagination: React.FC<PaginationProps> = ({
  totalProducts,
  productsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleClick = (page: number) => {
    // Ensure the page number is within the valid range
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex justify-center gap-3 pb-5 dark:text-white mt-4">
      <button
        onClick={() => handleClick(currentPage - 1)} // Decreases current page number when clicked
        disabled={currentPage === 1} // Disables the button when it's on the first page
        className={currentPage === 1 ? 'text-gray-400 cursor-text' : ''} // Adds a disabled style for first page
      >
        Previous
      </button>

      {/* Generate buttons for each page */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={currentPage === index + 1 ? 'font-extrabold' : ''}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handleClick(currentPage + 1)} // Increases current page number when clicked
        disabled={currentPage === totalPages} // Disables the button when it's on the last page
        className={
          currentPage === totalPages ? 'text-gray-400 cursor-text' : ''
        } // Adds a disabled style for last page
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
