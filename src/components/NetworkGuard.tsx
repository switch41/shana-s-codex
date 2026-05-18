import { useState, useEffect, type ReactNode } from "react";
import { OfflineScreen } from "./OfflineScreen";

export function NetworkGuard({ children }: { children: ReactNode }) {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setOffline(true);
    }

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  if (offline) return <OfflineScreen />;
  return <>{children}</>;
}
