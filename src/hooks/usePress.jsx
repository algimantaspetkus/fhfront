import { useCallback, useEffect, useRef, useState } from "react";

export function usePress({ shortPressCallback, longPressCallback, id }) {
  const [isLongPressing, setIsLongPressing] = useState(false);
  const pressDurationRef = useRef(0);
  const timeoutRef = useRef(null);

  const handleLongPressStart = useCallback(() => {
    setIsLongPressing(true);
    pressDurationRef.current = 0; // Reset the press duration
    timeoutRef.current = setTimeout(() => {
      setIsLongPressing(false);
      longPressCallback(id);
    }, 500); // Timeout duration to determine long press
  }, [id, longPressCallback]);

  const handleLongPressEnd = useCallback(() => {
    clearTimeout(timeoutRef.current);
    if (isLongPressing && pressDurationRef.current < 300) {
      shortPressCallback(id);
    }
    setIsLongPressing(false);
  }, [id, isLongPressing, pressDurationRef, shortPressCallback]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    longPressProps: {
      onMouseDown: handleLongPressStart,
      onMouseUp: handleLongPressEnd,
      onTouchStart: handleLongPressStart,
      onTouchEnd: handleLongPressEnd,
    },
  };
}
