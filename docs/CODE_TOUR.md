# Code Tour

Read the files in this order. Each step builds on the one before it.

## 1. `src/types/expense.ts`
Defines `Category` and `Expense`, the two TypeScript types the whole app shares. A type describes the shape of your data, so the editor warns you if you misspell a field or pass the wrong kind of value. **Concept: TypeScript types** (including a "union type" for categories).

## 2. `src/lib/format.ts`
Two small helper functions that turn raw data (`4.5`, `"2026-10-04"`) into display text (`$4.50`, `Oct 4, 2026`). They have no React in them, which makes them easy to understand and reuse. **Concept: plain helper functions.**

## 3. `src/components/ExpenseItem.tsx`
Draws one row of the list. It receives an `expense` and an `onDelete` function as props and calls `onDelete` when the button is clicked. **Concept: props, and sending events up to a parent.**

## 4. `src/components/ExpenseList.tsx`
Takes an array of expenses and uses `map` to turn each into an `ExpenseItem`. If the array is empty, it shows a friendly message instead. **Concepts: `map` rendering, `key`, conditional rendering.**

## 5. `src/components/CategoryFilter.tsx`
A dropdown whose value comes from props, and which reports changes through `onChange`. It never stores the choice itself. **Concept: controlled inputs.**

## 6. `src/components/Summary.tsx`
Shows the big total and the spending per category. Nothing is stored here: the numbers are calculated from the props every time, using `filter` and `reduce`. **Concept: derived values.**

## 7. `src/components/ExpenseForm.tsx`
The add form. Every input is tied to a `useState` value, and on submit it checks the data and shows inline errors instead of adding bad data. **Concepts: controlled inputs, `useState`, validation, event handlers.**

## 8. `src/app/page.tsx`
The main page and the "boss" of the app. It owns the expenses list and the filter in `useState`, and passes data and functions down to the children. **Concepts: lifting state up, derived values (the filtered list), immutable updates.**

## 9. `src/app/layout.tsx` and `src/app/globals.css`
The layout wraps every page (fonts, page title), and `globals.css` loads Tailwind and sets the background. You rarely need to edit these. **Concept: how Next.js wraps pages in a shared layout.**

## Try it yourself

1. **Easy:** change the list of categories in `page.tsx` (rename one, or add "Health"). Watch the form, filter, and summary all update.
2. **Easy-medium:** add a "Clear all" button that empties the expenses list.
3. **Medium:** sort the list by amount (highest first) instead of by date.
4. **Medium-hard:** show the largest expense in the `Summary`, for example "Biggest: Bus pass ($32.00)".
5. **Harder:** add an edit feature. Click "Edit" on a row to load it into the form, then save the changes back into the list.
