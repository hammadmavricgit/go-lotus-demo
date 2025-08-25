/**
 * Pagination utility functions for staff management
 */

/**
 * Calculate total pages based on total items and page size
 */
export function calculateTotalPages(
  totalItems: number,
  pageSize: number
): number {
  if (totalItems <= 0 || pageSize <= 0) return 0;
  return Math.ceil(totalItems / pageSize);
}

/**
 * Validate page number
 */
export function validatePageNumber(page: number, totalPages: number): number {
  if (page < 1) return 1;
  if (page > totalPages) return totalPages;
  return page;
}

/**
 * Calculate start and end item numbers for current page
 */
export function calculatePageRange(
  currentPage: number,
  pageSize: number,
  totalItems: number
): { start: number; end: number } {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return { start, end };
}

/**
 * Generate page numbers array with ellipsis for large page counts
 */
export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 7
): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= maxVisible) {
    // Show all pages if total is small
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);

    if (currentPage <= 4) {
      // Show first 5 pages + ellipsis + last page
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      // Show first page + ellipsis + last 5 pages
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page + ellipsis + current ± 1 + ellipsis + last page
      pages.push('...');
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }
  }

  return pages;
}

/**
 * Check if pagination should be shown
 */
export function shouldShowPagination(totalPages: number): boolean {
  return totalPages > 1;
}

/**
 * Get pagination info for display
 */
export function getPaginationInfo(
  currentPage: number,
  pageSize: number,
  totalItems: number
): {
  currentPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} {
  const totalPages = calculateTotalPages(totalItems, pageSize);
  const { start, end } = calculatePageRange(currentPage, pageSize, totalItems);

  return {
    currentPage,
    totalPages,
    startItem: start,
    endItem: end,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
