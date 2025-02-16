import { PollCard } from "@/components/cards/poll-card";

export default function Home() {
  return (
    <div className="space-y-4">
      <PollCard mode="summary" />
      <PollCard mode="summary" />
      <PollCard mode="summary" />
      <PollCard mode="summary" />
      <PollCard mode="summary" />
    </div>
  );
}
