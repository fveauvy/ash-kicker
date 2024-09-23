"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    window.addEventListener("routeChangeStart", handleStart);
    window.addEventListener("routeChangeComplete", handleComplete);
    window.addEventListener("routeChangeError", handleComplete);

    return () => {
      window.removeEventListener("routeChangeStart", handleStart);
      window.removeEventListener("routeChangeComplete", handleComplete);
      window.removeEventListener("routeChangeError", handleComplete);
    };
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-primary z-50">
      <div
        className="h-full bg-primary-foreground animate-[loading_2s_ease-in-out_infinite]"
        style={{ width: "0%" }}
      />
    </div>
  );
}
