import { PollCard } from "@/components/cards/poll-card";
import { CreatePollModal } from "@/components/modals/create-poll-modal";
import { PollDocument } from "@/lib/types";
import { fetchPolls } from "@/utils/api-calls";
import { getSession, hasPermission } from "@/utils/auth";
import { ObjectId } from "mongoose";

export default async function Home() {
  const [session, polls] = await Promise.all([getSession(), fetchPolls()]);
  const isAllowed = await hasPermission(
    "create:poll",
    session?.payload?._id as ObjectId
  );

  return (
    <div className="space-y-4 flex flex-col items-end">
      {isAllowed && <CreatePollModal />}
      <div className="space-y-4 w-full">
        {polls?.map((poll: PollDocument, index: number) => (
          <PollCard key={index} mode="summary" poll={poll} />
        ))}
      </div>
    </div>
  );
}
