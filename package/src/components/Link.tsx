import React from 'react';
import type { Path } from '../types';
import { useRouter } from '../utilities/useRouter';

/**
 * Props for the Link component
 * Extends standard anchor element props, replacing 'href' with 'to'
 */
export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /**
   * The path to navigate to when the link is clicked
   * @example "/about"
   * @example "/users/123"
   */
  to: Path;
};

/**
 * A declarative, accessible navigation link that updates the route without a full page reload.
 * 
 * @example
 * Basic usage:
 * ```tsx
 * <Link to="/about">About Us</Link>
 * ```
 * 
 * @example
 * With custom styling and attributes:
 * ```tsx
 * <Link 
 *   to="/profile" 
 *   className="nav-link"
 *   onClick={() => console.log('Navigating to profile')}
 * >
 *   View Profile
 * </Link>
 * ```
 * 
 * @example
 * Opening in a new tab:
 * ```tsx
 * <Link to="/privacy" target="_blank" rel="noopener noreferrer">
 *   Privacy Policy (opens in new tab)
 * </Link>
 * ```
 */
const Link = (props: LinkProps) => {
  const { onClick, to, ...otherProps } = props;
  const { navigate } = useRouter();
  
  const handleClick = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle the click if it's a regular click (not middle-click, cmd/ctrl+click, etc.)
    if (!e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      onClick?.(e);
      navigate(to);
    }
    // Let the browser handle the click normally for special cases (opening in new tab, etc.)
  }, [navigate, onClick, to]);

  return (
    <a
      {...otherProps}
      href={to}
      onClick={handleClick}
    />
  );
};

export default Link;
