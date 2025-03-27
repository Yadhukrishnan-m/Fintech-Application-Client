import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Calculate page numbers to display with useMemo for performance
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 1; // Number of pages to show on each side of current page

    // Handle edge cases
    if (totalPages <= 5) {
      // If few pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always include first page
    pages.push(1);

    // Calculate start and end of visible pages
    let startPage = Math.max(2, currentPage - maxVisiblePages);
    let endPage = Math.min(totalPages - 1, currentPage + maxVisiblePages);

    // Adjust to ensure we always show same number of pages if possible
    if (currentPage - maxVisiblePages < 2) {
      // We're close to the start, so show more pages at the end
      endPage = Math.min(totalPages - 1, 1 + 2 * maxVisiblePages);
    } else if (currentPage + maxVisiblePages > totalPages - 1) {
      // We're close to the end, so show more pages at the start
      startPage = Math.max(2, totalPages - 2 * maxVisiblePages);
    }

    // Add left ellipsis if needed
    if (startPage > 2) {
      pages.push("left-ellipsis");
    } else if (startPage === 2) {
      // No need for ellipsis, just add page 2
      pages.push(2);
    }

    // Add middle pages
    for (
      let i = Math.max(startPage, 3);
      i <= Math.min(endPage, totalPages - 2);
      i++
    ) {
      pages.push(i);
    }

    // Add right ellipsis if needed
    if (endPage < totalPages - 1) {
      pages.push("right-ellipsis");
    } else if (endPage === totalPages - 1) {
      // No need for ellipsis, just add the second-to-last page
      pages.push(totalPages - 1);
    }

    // Always include last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  // Don't render if there's only one page
//   if (totalPages <= 1) {
//     return null;
//   }

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* Previous Button */}
      <button
        className={`px-4 py-2 rounded-md text-white bg-teal-500 hover:bg-teal-600 transition ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === "left-ellipsis" || page === "right-ellipsis") {
          return (
            <span key={`${page}-${index}`} className="px-4 py-2 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <button
            key={`page-${page}`}
            className={`px-4 py-2 rounded-md ${
              page === currentPage
                ? "bg-teal-700 text-white"
                : "bg-teal-100 text-teal-700 hover:bg-teal-200"
            }`}
            onClick={() => goToPage(page as number)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        className={`px-4 py-2 rounded-md text-white bg-teal-500 hover:bg-teal-600 transition ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
