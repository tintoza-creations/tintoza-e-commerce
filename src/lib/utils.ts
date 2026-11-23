/**
 * Formats a number into Indian Rupee currency format (e.g. ₹14,999)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return `₹${amount.toLocaleString('en-IN')}`;
}
