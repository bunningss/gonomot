import { PollCardSkeleton } from "@/components/skeletons/poll-card-skeleton";

export default async function Loading() {
  return (
    <div className="space-y-4 w-full">
      <PollCardSkeleton />
    </div>
  );
}
