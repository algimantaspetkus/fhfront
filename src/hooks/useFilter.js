import { useState } from "react";

export function useFilter(itemName) {
  const [filterCompleted, setFilterCompleted] = useState(
    localStorage.getItem(itemName) === "true"
  );

  function toggleFilterCompleted() {
    setFilterCompleted(!filterCompleted);
    localStorage.setItem(itemName, !filterCompleted);
  }

  return { filterCompleted, toggleFilterCompleted };
}
