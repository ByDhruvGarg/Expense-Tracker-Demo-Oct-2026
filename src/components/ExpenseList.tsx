// ExpenseList shows every expense it is given, or a friendly message if there are none.
// Props: expenses (the already-filtered list), onDelete (passed down to each row).
// "use client" is needed because it renders ExpenseItem, which uses click handlers.
"use client";

import { Expense } from "@/types/expense";
import ExpenseItem from "./ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
  onDelete: (id: string) => void;
};

// Chooses between the empty state and the list of rows.
export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  // Empty state: nothing to show yet, so we encourage the user instead of showing a blank gap.
  if (expenses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
        <p className="text-lg font-medium">No expenses yet 🎉</p>
        <p className="text-sm">Add an expense using the form above.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {/* map turns each expense into a row. "key" helps React track which row is which. */}
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  );
}
