// Turns a number like 4.5 into a money string like "$4.50".
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// Turns "2026-10-04" into a friendly string like "Oct 4, 2026".
export function formatDate(dateString: string): string {
  // Split the text ourselves so the browser's time zone cannot shift the day by one.
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day); // months start at 0 in JavaScript
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
