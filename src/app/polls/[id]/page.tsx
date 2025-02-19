import { PollCard } from "@/components/cards/poll-card";
import { TopicComments } from "@/components/topic-comments";
import { fetchPoll } from "@/utils/api-calls";

async function Poll({ id }: { id: string }) {
  const poll = await fetchPoll(id);

  return (
    <div className="space-y-4">
      <PollCard mode="details" poll={poll} />
      <TopicComments />
    </div>
  );
}

export default async function page({ params }: { params: { id: string } }) {
  return <Poll id={params.id} />;
}
