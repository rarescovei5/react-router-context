# react-router-ctx

A lightweight, zero-dependency React router that replicates the familiar `react-router` API using React Context. This package enables flexible, in-memory routing for React applications—ideal for environments where you don't want to rely on browser history or URL changes (e.g., embedded apps, modals, or testing).

## Features

- **Familiar API:** Components like `<ContextRouter>`, `<Routes>`, `<Route>`, `<Link>`, and `<Outlet>`.
- **Context-based Routing:** Stores and manages the current route using React Context, not browser history.
- **Parameter & Wildcard Support:** Route patterns support parameters (`:id`) and wildcards (`*`).
- **TypeScript Support:** Fully typed API for safer development.
- **No External Dependencies:** Only requires React as a peer dependency.

## Installation

```sh
npm install react-router-ctx
```

## Usage

```tsx
import { ContextRouter, Routes, Route, Link, Outlet } from 'react-router-ctx';

function App() {
  return (
    <ContextRouter>
      <Routes>
        <Route path="/fizz/*" element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Route>
      </Routes>
    </ContextRouter>
  );
}

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/about">About</Link>
    </div>
  );
}
```

## API

### Components

#### - `<ContextRouter>`

- Provides routing context for its children.
- Props:

  - `basePath?: string` – Optional initial path (default: `/`).
  - `children`: A single `<Routes>` element.

#### - `<Routes>`

- Renders the first matching `<Route>` child for the current path.

#### - `<Route>`

- Props:

  - `path: string` – Route pattern (supports parameters and wildcards).
  - `element?: ReactNode` – The component to render.
  - `children?: <Route>[]` – Nested routes.

#### - `<Link>`

- Props:

  - `to: string` – Path to navigate to.
  - Other anchor props.

#### - `<Outlet>`

- Renders nested routes inside a parent `<Route>`.

### Hooks

- `useRouter()` – Access `{ path, navigate }` from context.
- `useParams()` – Get route parameters as an object.

## Example

```tsx
import { useParams } from 'react-router-ctx';

function UserDetail() {
  const params = useParams();
  return <div>User ID: {params.id}</div>;
}
```

## When to Use

- In-memory navigation (modals, wizards, embedded apps)
- Testing React components with routing
- Apps where you don't want to manipulate the browser URL

## Limitations

- Does **not** sync with browser history or URL.
- Not a drop-in replacement for `react-router` in all scenarios.

## License

This Project is licensed under the MIT license

## Contributing

Contributions, issues, and feature requests are welcome!

https://github.com/rarescovei5/react-router-ctx
