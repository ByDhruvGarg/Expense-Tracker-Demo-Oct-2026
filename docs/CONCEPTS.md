# Concepts Glossary

**Component**: a function that returns a piece of UI. You use it like an HTML tag.
```tsx
function Greeting() { return <p>Hello!</p>; }
// used as: <Greeting />
```

**Props**: inputs you pass to a component, like function arguments. They are read-only.
```tsx
function Greeting({ name }: { name: string }) { return <p>Hello {name}</p>; }
// <Greeting name="Sam" />
```

**State**: data a component remembers between renders. When it changes, React redraws the screen.

**Hook**: a special function starting with `use` that gives a component extra abilities (like memory). Only call hooks at the top of a component.

**`useState`**: the hook that creates a piece of state. It returns the current value and a function to change it.
```tsx
const [count, setCount] = useState(0);
setCount(count + 1);
```

**Controlled input**: a form input whose value lives in state, so React always knows what it shows.
```tsx
<input value={name} onChange={(event) => setName(event.target.value)} />
```

**Key**: a unique `key` prop on each item made with `map`, so React can tell the items apart.
```tsx
{expenses.map((expense) => <li key={expense.id}>{expense.description}</li>)}
```

**Derived state**: a value you calculate from existing state instead of storing separately. It can never get out of sync.
```tsx
const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
```

**Client component**: a component that runs in the browser. Files that use state or click handlers need `"use client"` at the top.
```tsx
"use client";
```

**TypeScript type**: a description of what shape some data has. The editor checks your code against it.
```ts
type Expense = { description: string; amount: number };
```
