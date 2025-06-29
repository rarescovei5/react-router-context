# React Router Context

A lightweight, type-safe routing solution for React applications using Context API. This library provides a simple and intuitive way to handle client-side routing in your React applications without external dependencies.

## Features

- 🚀 Built with TypeScript for type safety
- 🔄 Context-based routing
- 🧩 Simple and intuitive API
- ⚡ Lightweight and performant
- 🔄 Nested routes support

## Installation

```bash
npm install react-router-ctx
```

## Basic Usage

### 1. Setup the Router Provider

```tsx
import { RouterProvider } from 'react-router-ctx';

function App() {
  return (
    <RouterProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </RouterProvider>
  );
}
```

### 2. Use the Link Component

```tsx
import { Link } from 'react-router-ctx';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/users/123">User Profile</Link>
    </nav>
  );
}
```

### 3. Access Route Parameters

```tsx
import { useParams } from 'react-router-ctx';

function UserProfile() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}
```

## API Reference

### Components

- `RouterProvider`: The root provider component
- `Routes`: Container for route definitions
- `Route`: Defines a route with a path and element
- `Link`: Navigation link component

### Hooks

- `useNavigate`: Programmatic navigation
- `useParams`: Access route parameters
- `useLocation`: Access current location
- `useSearchParams`: Access and modify URL search parameters

## License

This Project is licensed under the MIT license
