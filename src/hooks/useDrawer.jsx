import { useEffect, useState } from "react";

export function useDrawer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    const handleBackButton = (event) => {
      if (drawerOpen) {
        event.preventDefault();
        setDrawerOpen(false);
      } else {
        window.history.back();
      }
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [drawerOpen]);

  function openDrawer() {
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return { drawerOpen, openDrawer, closeDrawer };
}
