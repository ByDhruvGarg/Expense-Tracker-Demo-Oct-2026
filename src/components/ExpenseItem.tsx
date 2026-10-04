// ExpenseItem shows one expense as a single row with a delete button.
// Props: expense (the data to show), onDelete (called with the expense id when the button is clicked).
// "use client" is needed because the delete button has a click handler.
"use client";

import { Expense } from "@/types/expense";
import { formatCurrency, formatDate } from "@/lib/format";

type ExpenseItemProps = {
  expense: Expense;
  onDelete: (id: string) => void;
};

// Renders one row: description + category/date on the left, amount + delete on the right.
export default function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 py-3">
      <div className="min-w-0">
        <p className="truncate font-medium text-slate-800">{expense.description}</p>
        <p className="text-sm text-slate-500">
          {expense.category} · {formatDate(expense.date)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-slate-800">{formatCurrency(expense.amount)}</span>
        <button
          type="button"
          onClick={() => onDelete(expense.id)}
          aria-label={`Delete ${expense.description}`}
          className="rounded-lg px-2 py-1 text-sm text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
