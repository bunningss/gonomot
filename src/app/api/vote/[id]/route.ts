import Poll from "@/lib/models/Poll";
import User from "@/lib/models/User";
import mongoose from "mongoose";
import { connectDb } from "@/lib/db/connect-db";
import { verifyToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

// Cast a vote
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  let session;
  try {
    await connectDb();
    session = await mongoose.startSession();
    session.startTransaction();

    const { id } = await verifyToken(request, "cast:vote");
    const body = await request.json();

    if (body.vote === "yes" || body.vote === "no") {
      const poll = await Poll.findById(params.id);

      const currentTime = new Date();
      if (poll.duration < currentTime) {
        throw new Error("Voting closed!");
      }

      if (!poll) {
        return NextResponse.json({ msg: "Invalid poll." }, { status: 400 });
      }

      const user = await User.findById(id);

      const votedThisPoll = user.votes?.includes(poll?._id);
      if (votedThisPoll) {
        throw new Error("You already cast your vote.");
      }

      if (body.vote?.toLowerCase() === "yes") {
        poll.upvotes += 1;
        poll.upvotedUsers?.push(id);
        user.votes.push(poll._id);
      } else if (body.vote?.toLowerCase() === "no") {
        poll.downvotes += 1;
        poll.downvotedUsers?.push(id);
        user.votes.push(poll._id);
      }

      await poll.save({ session });
      await user.save({ session });
    } else {
      throw new Error("Invalid poll.");
    }

    await session.commitTransaction();

    return NextResponse.json({ msg: "Voting successful." }, { status: 200 });
  } catch (error) {
    await session?.abortTransaction();
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 400 }
    );
  } finally {
    await session?.endSession();
  }
}
