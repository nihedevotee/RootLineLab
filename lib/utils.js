/**
 * Simple conditional classnames combiner
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a number to padded string, e.g. 1 -> "01"
 */
export function padNumber(num) {
  return String(num).padStart(2, '0');
}
