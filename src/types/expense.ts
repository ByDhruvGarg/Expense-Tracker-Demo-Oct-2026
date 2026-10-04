// The only categories an expense is allowed to have. A "union type" lists the exact allowed strings.
export type Category = "Food" | "Transport" | "Rent" | "Entertainment" | "Shopping" | "Other";

// The shape of one expense. TypeScript will warn us if we forget a field or use the wrong type.
export type Expense = {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string; // YYYY-MM-DD
};
