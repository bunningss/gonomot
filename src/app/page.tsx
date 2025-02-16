import { TopicCard } from "@/components/cards/topic-card";

export default function Home() {
  return (
    <div className="space-y-4">
      <TopicCard mode="summary" />
      <TopicCard mode="summary" />
      <TopicCard mode="summary" />
      <TopicCard mode="summary" />
      <TopicCard mode="summary" />
    </div>
  );
}
