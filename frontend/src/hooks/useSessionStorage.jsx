import { useState } from "react";

export default function useSessionStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const setStoredValue = (newValue) => {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}