import { PollCard } from "@/components/cards/poll-card";
import { CreatePollModal } from "@/components/modals/create-poll-modal";

export default function Home() {
  return (
    <div>
      <CreatePollModal />
      <div className="space-y-4">
        <PollCard mode="summary" />
        <PollCard mode="summary" />
        <PollCard mode="summary" />
        <PollCard mode="summary" />
        <PollCard mode="summary" />
      </div>
    </div>
  );
}
