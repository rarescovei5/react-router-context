import React from 'react';
import { useRouter } from '../utilities/useRouter';
import { RouteContext, type RouteProps } from './Route';
import { matchesPath } from '../utilities/matchesPath';

/**
 * Renders the child route's element if there is one.
 * Used in parent route elements to render their child route elements.
 * 
 * This allows nested UI to show up when child routes are rendered.
 * 
 * @example
 * Basic usage in a layout component:
 * 
 * ```tsx
 * function Layout() {
 *   return (
 *     <div>
 *       <nav>Navigation</nav>
 *       <Outlet /> {/* Child routes render here *\/}
 *     </div>
 *   );
 * }
 * ```
 * 
 * @example
 * With nested routes:
 * 
 * ```tsx
 * <Route path="/parent/*" element={<ParentLayout />}>
 *   <Route path="" element={<ChildComponent />} />
 *   <Route path="/details" element={<DetailsPage />} />
 * </Route>
 * ```
 */
const Outlet = () => {
  const { path } = useRouter();
  const routeCtx = React.useContext(RouteContext);

  if (!routeCtx?.children) return null;

  const matchingRoute = React.Children.toArray(routeCtx.children).filter((child) => {
    if (!React.isValidElement<RouteProps>(child)) return false;
    return matchesPath(path, routeCtx.pattern + child.props.path);
  });

  return matchingRoute[0] ?? null;
};

export default Outlet;
