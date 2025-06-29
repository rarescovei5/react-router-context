import React from 'react';
import type { Path } from '../types';
import type { RoutesProps } from './Routes';
import { isChildrenRoutes } from '../utilities/areChildrenValid';

interface PathContextType {
  /** Current path */
  path: Path;
  /** Function to navigate to a new path */
  navigate: React.Dispatch<React.SetStateAction<Path>>;
}


export const PathContext = React.createContext<PathContextType | null>(null);

export interface ContextRouterProps {
  /**
   * The initial path to start with
   * @default "/"
   */
  basePath?: Path;
  /**
   * A single Routes component that will be the root of your route hierarchy
   */
  children?: React.ReactElement<RoutesProps>;
}

/**
 * The root component that provides routing context to all child components.
 * Must wrap your entire application or the part where you want to use routing.
 * 
 * @example
 * ```tsx
 * <ContextRouter>
 *   <Routes>
 *     <Route path="/" element={<HomePage />} />
 *     <Route path="/about" element={<AboutPage />} />
 *   </Routes>
 * </ContextRouter>
 * ```
 */
const ContextRouter = (props: ContextRouterProps) => {
  const [path, setPath] = React.useState(props.basePath ?? '/');
  const value = React.useMemo(() => ({ path, navigate: setPath }), [path]);

  if (!isChildrenRoutes(props.children)) {
    console.error('ContextRouter must have a single Routes component as its child');
    return null;
  }

  return <PathContext value={value}>{props.children}</PathContext>;
};

export default ContextRouter;
