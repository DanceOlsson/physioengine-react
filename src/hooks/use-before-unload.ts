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