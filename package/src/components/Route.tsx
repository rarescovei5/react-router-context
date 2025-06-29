import React from 'react';
import type { Path } from '../types';
import { areChildrenRoute } from '../utilities/areChildrenValid';

interface RouteContextType {
  /** The full pattern path including parent routes */
  pattern: Path;
  /** Child route elements */
  children?: React.ReactElement<RouteProps> | React.ReactElement<RouteProps>[];
}

export const RouteContext = React.createContext<RouteContextType | null>(null);

export interface RouteProps {
  /**
   * The path pattern to match against the URL path.
   * Supports parameters with `:paramName` and wildcards with `*`.
   * @example
   * - "/users" - exact match
   * - "/users/:id" - parameter match
   * - "/settings/*" - wildcard match for nested routes
   */
  path: Path;
  /**
   * Child route elements (nested routes)
   */
  children?: React.ReactElement<RouteProps> | React.ReactElement<RouteProps>[];
  /**
   * The React element to render when the route matches
   */
  element?: React.ReactNode;
}

/**
 * A component that declares a route in your application.
 * 
 * @example
 * Basic usage:
 * ```tsx
 * <Route path="/users" element={<UsersPage />} />
 * ```
 * 
 * @example
 * With parameters:
 * ```tsx
 * <Route path="/users/:userId" element={<UserProfile />} />
 * ```
 * 
 * @example
 * With nested routes:
 * ```tsx
 * <Route path="/dashboard/*" element={<DashboardLayout />}>
 *   <Route path="/stats" element={<StatsPage />} />
 *   <Route path="/settings" element={<SettingsPage />} />
 * </Route>
 * ```
 */
const Route = (props: RouteProps) => {
  // Get parent route context to build full path pattern
  const parentCtx = React.useContext(RouteContext);
  const parentPattern = parentCtx?.pattern ?? '';

  // Strip off any trailing "/*" from the route's own path
  const ownPathSansWildcard = props.path.replace(/\/\*$/, '');

  // Compute the static base from the parent (also stripping its trailing wildcard)
  const basePattern = parentPattern === '*' ? '' : parentPattern.replace(/\/\*$/, '');

  // Join them and collapse any "//" into a single "/"
  const fullPattern = `${basePattern}/${ownPathSansWildcard}`.replace(/\/\/+/g, '/');

  // Memoize context value to prevent unnecessary re-renders
  const value = React.useMemo(
    () => ({
      children: props.children,
      pattern: fullPattern
    }),
    [props.children, fullPattern]
  );

  if (!areChildrenRoute(props.children)) {
    return null;
  }

  return (
    <RouteContext.Provider value={value}>
      {props.element}
    </RouteContext.Provider>
  );
};

export default Route;
