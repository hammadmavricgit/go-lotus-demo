/**
 * Search utility functions for staff management
 */

/**
 * Debounce function to limit the rate of function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Validate search query
 */
export function validateSearchQuery(query: string): boolean {
  if (!query || typeof query !== 'string') {
    return false;
  }

  // Remove whitespace and check if query has content
  const trimmedQuery = query.trim();
  return trimmedQuery.length > 0;
}

/**
 * Sanitize search query for API calls
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';

  // Remove extra whitespace and trim
  return query.trim().replace(/\s+/g, ' ');
}

/**
 * Check if search query matches any field in staff data
 */
export function searchMatchesStaff(
  query: string,
  staff: {
    name: string;
    title: string;
    mobilePhone: string | null;
    supervisor: string | null;
  }
): boolean {
  if (!query || !staff) return false;

  const searchTerm = query.toLowerCase();

  return (
    staff.name.toLowerCase().includes(searchTerm) ||
    staff.title.toLowerCase().includes(searchTerm) ||
    (staff.mobilePhone?.toLowerCase().includes(searchTerm) ?? false) ||
    (staff.supervisor?.toLowerCase().includes(searchTerm) ?? false)
  );
}

/**
 * Highlight search terms in text
 */
export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm || !text) return text;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
