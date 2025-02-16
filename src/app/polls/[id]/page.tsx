import { PollCard } from "@/components/cards/poll-card";
import { TopicComments } from "@/components/topic-comments";

export default async function page() {
  return (
    <div className="space-y-4">
      <PollCard mode="details" />
      <TopicComments />
    </div>
  );
}
