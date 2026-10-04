// The main page. It owns ALL the data (expenses + filter) and passes it down to child components.
// This idea is called "lifting state up": one parent holds the state, children just display it.
// "use client" is needed because this file uses useState, which only works in the browser.
"use client";

import { useState } from "react";
import { Category, Expense } from "@/types/expense";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import Summary from "@/components/Summary";
import CategoryFilter, { CategoryFilterValue } from "@/components/CategoryFilter";

// Every category in one place, so changing this list updates the whole app.
const CATEGORIES: Category[] = ["Food", "Transport", "Rent", "Entertainment", "Shopping", "Other"];

// A few sample expenses so the page is not empty on first load.
function createSeedExpenses(): Expense[] {
  return [
    { id: crypto.randomUUID(), description: "Coffee", amount: 4.5, category: "Food", date: "2026-10-01" },
    { id: crypto.randomUUID(), description: "Bus pass", amount: 32, category: "Transport", date: "2026-10-02" },
    { id: crypto.randomUUID(), description: "Netflix", amount: 15.99, category: "Entertainment", date: "2026-10-03" },
  ];
}

// The page component itself.
export default function Home() {
  // The list of all expenses. Passing a function means the seed data is only created once.
  const [expenses, setExpenses] = useState<Expense[]>(createSeedExpenses);
  // Which category is selected in the filter dropdown.
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilterValue>("All");

  // Adds a new expense by creating a NEW array (React needs a new array to notice the change).
  function handleAddExpense(newExpense: Omit<Expense, "id">) {
    const expenseWithId: Expense = { ...newExpense, id: crypto.randomUUID() };
    setExpenses([...expenses, expenseWithId]);
  }

  // Removes the expense with the given id by keeping everything else.
  function handleDeleteExpense(idToDelete: string) {
    setExpenses(expenses.filter((expense) => expense.id !== idToDelete));
  }

  // Derived value: only the expenses that match the filter, newest date first.
  // filter already gives us a fresh array, so sorting it will not change the original state.
  const visibleExpenses = expenses
    .filter((expense) => selectedCategory === "All" || expense.category === selectedCategory)
    .sort((first, second) => second.date.localeCompare(first.date)); // YYYY-MM-DD text sorts correctly

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">Expense Tracker</h1>
          <p className="text-sm text-slate-500">
            Data lives in memory. Refresh the page and it disappears.
          </p>
        </header>

        <div className="space-y-6 rounded-2xl bg-white p-6 shadow-md">
          <Summary
            expenses={visibleExpenses}
            allExpenses={expenses}
            categories={CATEGORIES}
            filterLabel={selectedCategory}
          />
          <hr className="border-slate-100" />
          <ExpenseForm categories={CATEGORIES} onAdd={handleAddExpense} />
          <hr className="border-slate-100" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Expenses</h2>
            <CategoryFilter
              selectedCategory={selectedCategory}
              categories={CATEGORIES}
              onChange={setSelectedCategory}
            />
          </div>
          <ExpenseList expenses={visibleExpenses} onDelete={handleDeleteExpense} />
        </div>
      </div>
    </main>
  );
}
