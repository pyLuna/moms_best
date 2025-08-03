import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Progress } from "../ui/progress";

export default function HeadLoader() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(10); // Initial progress

    let progressTimeout: NodeJS.Timeout;
    let completionTimeout: NodeJS.Timeout;
    let fallbackTimeout: NodeJS.Timeout;

    const updateProgress = () => {
      // Check document ready state
      if (document.readyState === "loading") {
        setProgress(30);
      } else if (document.readyState === "interactive") {
        setProgress(60);
      } else if (document.readyState === "complete") {
        setProgress(95);

        // Final completion
        progressTimeout = setTimeout(() => {
          setProgress(100);
          completionTimeout = setTimeout(() => {
            setIsLoading(false);
            setProgress(0);
          }, 200);
        }, 100);
      }
    };

    // Initial check
    updateProgress();

    // Listen for document ready state changes
    const handleReadyStateChange = () => updateProgress();
    document.addEventListener("readystatechange", handleReadyStateChange);

    // Fallback timeout to ensure loading doesn't hang
    fallbackTimeout = setTimeout(() => {
      setProgress(100);
      completionTimeout = setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    }, 3000);

    return () => {
      document.removeEventListener("readystatechange", handleReadyStateChange);
      clearTimeout(fallbackTimeout);
      clearTimeout(progressTimeout);
      clearTimeout(completionTimeout);
    };
  }, [location.pathname]);

  if (!isLoading && progress === 0) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Progress
        value={progress}
        className="h-1 rounded-none bg-transparent"
      />
    </div>
  );
}
