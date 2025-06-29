import React from 'react';
import { useRouter } from './useRouter';
import { RouteContext } from '../components/Route';

const splitSegments = (input: string) => input.split('/').filter((seg) => seg.length > 0);

/**
 * A hook that returns an object of key/value pairs of the dynamic parameters
 * from the current URL that were matched by the route path.
 * 
 * @returns An object whose keys are the parameter names and values are the matched segments
 * from the URL. Returns an empty object if no parameters are present.
 * 
 * @throws {Error} If a parameter segment immediately follows a wildcard in the route pattern
 * 
 * @example
 * // For a route with path="/users/:userId/posts/:postId"
 * // and current URL "/users/123/posts/456"
 * const params = useParams();
 * // params will be { userId: '123', postId: '456' }
 */
export function useParams(): Record<string, string> {
  const { path } = useRouter();
  const ctx = React.useContext(RouteContext);

  const pattern = ctx?.pattern;
  if (!pattern) return {};

  const patSegsForValidation = splitSegments(pattern);
  for (let i = 0; i < patSegsForValidation.length - 1; i++) {
    if (patSegsForValidation[i] === '*' && patSegsForValidation[i + 1].startsWith(':')) {
      console.error(
        `Illegal route pattern "${pattern}": ` +
          `parameter segment "${patSegsForValidation[i + 1]}" ` +
          `cannot immediately follow a wildcard. ` +
          `Please insert a literal segment between them.`
      );
      return {};
    }
  }

  return React.useMemo(() => {
    const params: Record<string, string> = {};
    const pathSegs = splitSegments(path);
    const patSegs = patSegsForValidation; // reuse

    let pathIdx = 0;
    let patIdx = 0;

    let lastStarPatIdx = -1;
    let lastStarPathIdx = -1;

    while (pathIdx < pathSegs.length) {
      const pat = patSegs[patIdx];

      // 1) wildcard → record for backtrack, skip it in pattern
      if (pat === '*') {
        lastStarPatIdx = patIdx++;
        lastStarPathIdx = pathIdx;
        continue;
      }

      const segment = pathSegs[pathIdx];

      // 2) parameter → capture it
      if (pat?.startsWith(':')) {
        const key = pat.slice(1);
        params[key] = segment;
        patIdx++;
        pathIdx++;
        continue;
      }

      // 3) exact match → consume both
      if (pat === segment) {
        patIdx++;
        pathIdx++;
        continue;
      }

      // 4) mismatch with previous '*'? → backtrack
      if (lastStarPatIdx !== -1) {
        patIdx = lastStarPatIdx + 1;
        pathIdx = ++lastStarPathIdx;
        continue;
      }

      // 5) no match at all
      return {};
    }

    // skip any trailing '*' in the pattern
    while (patIdx < patSegs.length && patSegs[patIdx] === '*') {
      patIdx++;
    }

    // if we didn’t consume the whole pattern, it’s not a match
    if (patIdx !== patSegs.length) {
      return {};
    }

    return params;
  }, [path, pattern]);
}
