// ExpenseForm lets the user type a new expense and checks it before adding.
// Props: categories (options for the dropdown), onAdd (called with the new expense data when valid).
// "use client" is needed because it keeps form state and handles typing and submitting.
"use client";

import { useState } from "react";
import { Category, Expense } from "@/types/expense";

type ExpenseFormProps = {
  categories: Category[];
  // The parent creates the id, so we only send the other fields.
  onAdd: (newExpense: Omit<Expense, "id">) => void;
};

// Shared styling for all inputs, so we write it once.
const inputClasses =
  "w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

// Gives today's date as YYYY-MM-DD, using the user's local time zone.
function getToday(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // pad so 5 becomes "05"
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

// Renders the form and its inline error messages.
export default function ExpenseForm({ categories, onAdd }: ExpenseFormProps) {
  // Each input is "controlled": React state is the single source of truth for what it shows.
  const [description, setDescription] = useState("");
  // Amount is kept as text while typing, and converted to a number on submit.
  const [amount, setAmount] = useState("");
  // Remembers which category is selected in the dropdown.
  const [category, setCategory] = useState<Category>(categories[0]);
  // Remembers the chosen date, starting with today.
  const [date, setDate] = useState(getToday);
  // Holds the error message for the description field ("" means no error).
  const [descriptionError, setDescriptionError] = useState("");
  // Holds the error message for the amount field.
  const [amountError, setAmountError] = useState("");

  // Runs when the user submits the form.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page, which would wipe our in-memory data.
    event.preventDefault();

    const trimmedDescription = description.trim(); // trim removes spaces at both ends
    const amountNumber = Number(amount);

    // Work out each error first, so both can show at the same time.
    const newDescriptionError = trimmedDescription === "" ? "Description cannot be empty." : "";
    const amountIsValid = amount !== "" && Number.isFinite(amountNumber) && amountNumber > 0;
    const newAmountError = amountIsValid ? "" : "Amount must be a number greater than 0.";

    setDescriptionError(newDescriptionError);
    setAmountError(newAmountError);

    // If anything is wrong, stop here so the expense is not added.
    if (newDescriptionError || newAmountError) {
      return;
    }

    onAdd({ description: trimmedDescription, amount: amountNumber, category, date });

    // Clear the text fields so the user can add another one right away.
    setDescription("");
    setAmount("");
  }

  return (
    // noValidate turns off the browser's own popups so our inline messages are used instead.
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-600">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="e.g. Lunch"
          className={inputClasses}
        />
        {descriptionError && <p className="mt-1 text-sm text-red-600">{descriptionError}</p>}
      </div>

      <div>
        <label htmlFor="amount" className="mb-1 block text-sm font-medium text-slate-600">
          Amount ($)
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="0.00"
          className={inputClasses}
        />
        {amountError && <p className="mt-1 text-sm text-red-600">{amountError}</p>}
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-slate-600">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value as Category)}
          className={inputClasses}
        >
          {categories.map((categoryName) => (
            <option key={categoryName} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date" className="mb-1 block text-sm font-medium text-slate-600">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="flex items-end">
        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Add expense
        </button>
      </div>
    </form>
  );
}
