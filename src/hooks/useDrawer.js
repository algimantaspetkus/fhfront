import { useEffect, useState } from "react";

export function useDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shouldHandleBack, setShouldHandleBack] = useState(true);

  useEffect(() => {
    const handleBackButton = (event) => {
      if (shouldHandleBack) {
        if (drawerOpen) {
          event.preventDefault();
          closeDrawer();
        }
      } else {
        setShouldHandleBack(true);
      }
    };

    if (drawerOpen) {
      window.history.pushState({ drawerOpen: true }, "");
    }

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [drawerOpen, shouldHandleBack]);

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setShouldHandleBack(false);
    setDrawerOpen(false);
  }

  return { drawerOpen, openDrawer, closeDrawer };
}
