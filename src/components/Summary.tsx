// Summary shows the big total and a small per-category breakdown.
// Props: expenses (the filtered list, for the total), allExpenses (every expense, for the breakdown),
// categories (all category names), filterLabel (text like "All" or "Food").
// No "use client" needed: it has no state or events, so it can stay a regular server-friendly component.
import { Category, Expense } from "@/types/expense";
import { formatCurrency } from "@/lib/format";

type SummaryProps = {
  expenses: Expense[];
  allExpenses: Expense[];
  categories: Category[];
  filterLabel: string;
};

// Adds up the amounts of a list of expenses.
function addUp(expenses: Expense[]): number {
  return expenses.reduce((runningTotal, expense) => runningTotal + expense.amount, 0);
}

// Renders the total and the category breakdown.
export default function Summary({ expenses, allExpenses, categories, filterLabel }: SummaryProps) {
  // Derived value: calculated from the props each render, so it is never out of date.
  const total = addUp(expenses);

  return (
    <section>
      <p className="text-sm font-medium text-slate-500">Total ({filterLabel})</p>
      <p className="text-4xl font-bold text-indigo-600">{formatCurrency(total)}</p>

      <h2 className="mt-5 text-sm font-semibold text-slate-600">Spent per category</h2>
      <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {categories.map((category) => {
          // Only count expenses that belong to this category.
          const categoryExpenses = allExpenses.filter((expense) => expense.category === category);
          return (
            <li key={category} className="rounded-lg bg-slate-50 px-3 py-2 text-sm">
              <span className="block text-slate-500">{category}</span>
              <span className="font-semibold text-slate-800">
                {formatCurrency(addUp(categoryExpenses))}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
