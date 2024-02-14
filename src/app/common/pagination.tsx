import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const renderPageButtons = () => {
    const pageButtons = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    const page = (page: any) => {
      // alert(page)
    };

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <React.Fragment key={i}>
          <button
            onClick={() => {
              onPageChange(i);
            }}
            className={`${
              currentPage === i
                ? "bg-blue-500 text-danger font-bold py-2 px-4 rounded focus:outline-none pagination-button-select"
                : "bg-gray-300 hover:bg-blue-700 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none pagination-button"
            }`}
          >
            {i}
          </button>

          {/* </ul> */}
        </React.Fragment>
      );
    }

    return pageButtons;
  };

  return (
    <div className=" space-x-1 mt-4  sideColor ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed pagination-button-disable"
            : "bg-blue-500 hover:bg-blue-700 pagination-button"
        } text-primary font-bold py-2 px-4 rounded focus:outline-none pagination-button`}
      >
        {"<<"}
      </button>
      {renderPageButtons()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed pagination-button-disable"
            : "bg-blue-500 hover:bg-blue-700 pagination-button"
        } text-primary font-bold py-2 px-4 rounded focus:outline-none pagination-button`}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
