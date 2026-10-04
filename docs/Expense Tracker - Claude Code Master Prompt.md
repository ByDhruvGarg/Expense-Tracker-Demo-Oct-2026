## PROMPT START

You are a patient senior engineer teaching a beginner who has never built a web app. Build a complete Expense Tracker web app in the current folder. The main goal is that the code is easy to read and learn from, so favor clarity over cleverness.

### Tech stack
- Next.js (latest, App Router) with TypeScript
- Tailwind CSS for styling
- No database yet. All data lives in React state in memory. This is intentional, because next week we add MongoDB.
- You can use extra libraries like react-icons, lucide-react and next-themes. don't use any other.

### Features (build all of these)
1. **Add an expense** with a form containing: description (text), amount (number, in dollars), category (dropdown), and date (date input, defaults to today).
2. **List expenses** newest first. Each row shows description, category, date, amount, and a delete button.
3. **Running total** shown prominently at the top, updating instantly when expenses are added or removed.
4. **Delete an expense** with one click.
5. **Category filter**: a dropdown above the list with "All" plus each category. The total should reflect the current filter, and the label should say which filter is active.
6. **Category summary**: a small section showing the total spent per category.
7. **Empty state**: a friendly message when there are no expenses yet.
8. **Validation**: description cannot be empty, amount must be a positive number. Show a clear inline error message under the field and do not add the expense until it is fixed.

Categories: Food, Transport, Rent, Entertainment, Shopping, Other.

### Data model
Define one TypeScript type in `types/expense.ts`:

```ts
export type Category = "Food" | "Transport" | "Rent" | "Entertainment" | "Shopping" | "Other";

export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string; // YYYY-MM-DD
};
```

Generate ids with `crypto.randomUUID()`.

### Project structure
Keep it small and split into clear pieces:
- `app/page.tsx`: the main page. It owns the state (`useState<Expense[]>`) and the filter state, and passes data and functions down as props.
- `components/ExpenseForm.tsx`: the add form, including validation.
- `components/ExpenseList.tsx`: renders the list and the empty state.
- `components/ExpenseItem.tsx`: one row.
- `components/Summary.tsx`: the total and the per category breakdown.
- `components/CategoryFilter.tsx`: the filter dropdown.
- `lib/format.ts`: helper functions `formatCurrency(amount)` and `formatDate(dateString)`.
- `types/expense.ts`: the types above.

Mark client components with `"use client"` where needed, and add a one line comment explaining why each time.

### Code style rules (important, this is for teaching)
- Add a short, plain English comment above every function, every `useState`, and every non obvious line. Explain the why, as if talking to a first year student.
- Use descriptive names. No single letter variables except in tiny loops.
- Keep every file under about 120 lines.
- Prefer simple `map`, `filter`, and `reduce` over anything fancy.
- At the top of each component file, add a 2 to 3 line comment saying what the component does and which props it receives.
- Do not use `any`. Type every prop.

### Design
- Clean, modern, mobile friendly layout, centered card with max width around 2xl.
- Light background, one accent color (indigo), rounded corners, subtle shadows.
- The total is large and bold at the top of the card.
- Delete buttons turn red on hover. Inputs have clear focus rings.
- Add a header reading "Expense Tracker" with a small subtitle: "Data lives in memory. Refresh the page and it disappears."

### Seed data
Start with 3 sample expenses so the page is not empty on first load (for example Coffee, Bus pass, Netflix), so students can immediately see the UI working.

### Extra files to create
1. **`README.md`** with: what the app does, how to run it (`npm install`, `npm run dev`, open http://localhost:3000), the folder structure, and a short "Known limitation" section explaining that data resets on refresh because it only lives in React state.
2. **`CODE_TOUR.md`**: a guided reading order for a beginner. For each file in the project, give 2 to 4 sentences on what it does and the key concept it demonstrates (props, state, lifting state up, controlled inputs, `map` rendering, derived values, conditional rendering, TypeScript types). End with 5 "Try it yourself" challenges, from easy to harder (for example: change the categories, add a "Clear all" button, sort by amount, add an edit feature, show the largest expense).
3. **`CONCEPTS.md`**: a one page glossary of the terms used in the code (component, props, state, hook, `useState`, controlled input, key, derived state, client component, TypeScript type) with a tiny example for each.

### Process
1. First, show me a short plan listing the files you will create. Then build everything without stopping to ask questions.
2. After building, run `npm run lint` and fix any errors or warnings. Don't run dev server yet.
3. Finish with a short summary of what was built and the 3 most important things for a beginner to read first.

## PROMPT END
