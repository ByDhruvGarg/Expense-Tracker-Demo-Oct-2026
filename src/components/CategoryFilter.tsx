// CategoryFilter shows a dropdown for choosing which category to display.
// Props: selectedCategory (current choice), categories (all options), onChange (called with the new choice).
// "use client" is needed because it reacts to user changes (an event handler).
"use client";

import { Category } from "@/types/expense";

// "All" is not a real category, so we add it to the type here.
export type CategoryFilterValue = Category | "All";

type CategoryFilterProps = {
  selectedCategory: CategoryFilterValue;
  categories: Category[];
  onChange: (newValue: CategoryFilterValue) => void;
};

// Renders the label and the dropdown.
export default function CategoryFilter({
  selectedCategory,
  categories,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="category-filter" className="text-sm font-medium text-slate-600">
        Filter:
      </label>
      <select
        id="category-filter"
        value={selectedCategory}
        // event.target.value is plain text, so we tell TypeScript it is one of our allowed values.
        onChange={(event) => onChange(event.target.value as CategoryFilterValue)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
