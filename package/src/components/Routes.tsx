import React from 'react';
import type { RouteProps } from './Route';
import { areChildrenRoute } from '../utilities/areChildrenValid';
import { matchesPath } from '../utilities/matchesPath';
import { useRouter } from '../utilities/useRouter';

/**
 * Props for the Routes component
 */
export interface RoutesProps {
  /**
   * Child Route elements to be matched against the current path
   */
  children?: React.ReactElement<RouteProps> | React.ReactElement<RouteProps>[];
}

/**
 * A container for Route elements that renders the first child Route that matches the current path.
 * 
 * Routes are matched in the order they appear in the children array.
 * Only the first matching Route will be rendered.
 * 
 * @example
 * Basic usage:
 * ```tsx
 * <Routes>
 *   <Route path="/" element={<HomePage />} />
 *   <Route path="/about" element={<AboutPage />} />
 *   <Route path="*" element={<NotFoundPage />} />
 * </Routes>
 * ```
 */
const Routes = (props: RoutesProps) => {
  const { path } = useRouter();

  if (!areChildrenRoute(props.children)) {
    console.error('Routes must only contain Route components as children');
    return null;
  }

  // Convert children to array and filter for valid Route elements that match the current path
  const matchingRoute = React.Children.toArray(props.children).filter(
    (child) => React.isValidElement<RouteProps>(child) && matchesPath(path, child.props.path)
  );

  if (matchingRoute.length > 1) {
    console.error(`Found multiple routes matching path "${path}". Only the first one will be rendered.`);
  }

  // Return the first matching route or null if none match
  return matchingRoute[0] ?? null;
};

export default Routes;
