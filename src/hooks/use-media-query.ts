/**
 * A React hook that listens to media query changes and returns whether the query matches.
 * Useful for responsive design and feature detection based on media queries.
 * Example: const isLargeScreen = useMediaQuery('(min-width: 1024px)');
 */

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
} 