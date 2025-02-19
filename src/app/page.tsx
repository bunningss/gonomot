import { PollCard } from "@/components/cards/poll-card";
import { CreatePollModal } from "@/components/modals/create-poll-modal";
import { PollDocument } from "@/lib/types";
import { fetchPolls } from "@/utils/api-calls";
import { getSession } from "@/utils/auth";

async function Polls() {
  const [session, polls] = await Promise.all([getSession(), fetchPolls()]);

  return (
    <div className="space-y-4 flex flex-col items-end">
      {session?.payload && <CreatePollModal />}
      <div className="space-y-4 w-full">
        {polls?.map((poll: PollDocument, index: number) => (
          <PollCard key={index} mode="summary" poll={poll} />
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  return <Polls />;
}
