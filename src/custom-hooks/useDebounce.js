import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
      return () => clearTimeout(timer);
    }, delay);
  }, [value, delay]);

  return debounceValue;
};
