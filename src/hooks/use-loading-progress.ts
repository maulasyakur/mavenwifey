import { useState, useEffect } from "react";

export function useLoadingProgress() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5100); // Adjust timing based on your LoadingScreen duration

    return () => clearTimeout(timer);
  }, []);

  return isLoading;
}
