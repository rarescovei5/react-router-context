import { useContext } from 'react';
import { PathContext } from '../components/ContextRouter';

/**
 * A custom hook that provides access to the router's context.
 * This hook must be used within a `ContextRouter` component.
 * 
 * @returns An object containing:
 * - `path`: The current route path
 * - `navigate`: A function to programmatically navigate to a new path
 * 
 * @throws {Error} If used outside of a `ContextRouter` component
 * 
 * @example
 * Usage:
 * ```tsx
 * function MyComponent() {
 *   const { path, navigate } = useRouter();
 *   
 *   const handleClick = () => {
 *     navigate('/new-path');
 *   };
 *   
 *   return (
 *     <div>
 *       <p>Current path: {path}</p>
 *       <button onClick={handleClick}>Go to new path</button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useRouter = () => {
  const context = useContext(PathContext);

  if (!context) {
    throw new Error('useRouter must be used within a ContextRouter');
  }

  return context;
};
