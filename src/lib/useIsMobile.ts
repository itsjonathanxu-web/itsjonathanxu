import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

/** True below the md breakpoint. False on the server and during hydration. */
export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.innerWidth < 768,
    () => false
  );
}
