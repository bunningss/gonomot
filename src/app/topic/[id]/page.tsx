import { TopicCard } from "@/components/cards/topic-card";
import { TopicComments } from "@/components/topic-comments";

export default async function page() {
  return (
    <div className="space-y-4">
      <TopicCard mode="details" />
      <TopicComments />
    </div>
  );
}
