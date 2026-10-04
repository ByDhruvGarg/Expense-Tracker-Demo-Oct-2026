# Expense Tracker

A small, beginner-friendly web app built with Next.js (App Router), TypeScript, and Tailwind CSS.

## What it does
- Add an expense (description, amount, category, date) with inline validation
- List expenses, newest first, with one-click delete
- Show a running total that follows the selected category filter
- Show total spent per category
- Show a friendly empty state when there is nothing to list

## How to run
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Folder structure
```
src/
  app/
    page.tsx            main page, owns all state
    layout.tsx          shared page wrapper
    globals.css         Tailwind + base styles
  components/
    ExpenseForm.tsx     add form + validation
    ExpenseList.tsx     list + empty state
    ExpenseItem.tsx     one row
    Summary.tsx         total + per-category breakdown
    CategoryFilter.tsx  filter dropdown
  lib/
    format.ts           formatCurrency, formatDate
  types/
    expense.ts          Expense and Category types
```

New to the code? Start with [CODE_TOUR.md](CODE_TOUR.md) and keep [CONCEPTS.md](CONCEPTS.md) open as a glossary.

## Known limitation
There is no database yet. All expenses live in React state, which exists only in the browser's memory. **When you refresh the page, your changes disappear** and the 3 sample expenses come back. Next week we add MongoDB to fix this.
