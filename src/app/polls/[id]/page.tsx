import { PollCard } from "@/components/cards/poll-card";
import { Loading } from "@/components/loading";
import { TopicComments } from "@/components/topic-comments";
import { fetchPoll } from "@/utils/api-calls";
import { Suspense } from "react";

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
  return (
    <Suspense fallback={<Loading />}>
      <Poll id={params.id} />
    </Suspense>
  );
}
