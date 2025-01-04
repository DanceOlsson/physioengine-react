/**
 * A React hook that shows a browser confirmation dialog when the user tries to leave/reload the page.
 * This is useful for preventing accidental navigation away from forms or unsaved work.
*/
import { useEffect } from "react";

export function useBeforeUnload(shouldPrevent: boolean, message?: string) {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldPrevent) {
        event.preventDefault();
        // Modern browsers require returnValue to be set
        event.returnValue = message || "";
        return message; // For older browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [shouldPrevent, message]);
} 