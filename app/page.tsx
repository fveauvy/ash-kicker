import AshKicker from "@/components/ash-kicker";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <AshKicker />
    </Suspense>
  );
}
