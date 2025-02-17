import { connectDb } from "@/lib/db/connect-db";
import Poll from "@/lib/models/Poll";
import User from "@/lib/models/User";
import { verifyToken } from "@/utils/auth";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// Cast a vote
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDb();
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { id } = await verifyToken(request, "cast:vote");
    const body = await request.json();

    if (body.vote === "yes" || body.vote === "no") {
      const poll = await Poll.findById(params.id);

      if (!poll) {
        return NextResponse.json({ msg: "Invalid poll." }, { status: 400 });
      }

      const hasUpvoted = poll.upvotedUsers.includes(id);
      const hasDownvoted = poll.downvotedUsers.includes(id);

      if (body.vote === "yes") {
        if (hasUpvoted)
          throw new Error("Already voted in favour of the topic.");

        if (hasDownvoted) {
          await Poll.findByIdAndUpdate(
            params.id,
            {
              $pull: { downvotedUsers: id },
              $inc: { upvotes: 1, downvotes: -1 },
              $push: { upvotedUsers: id },
            },
            { new: true, session }
          );
        } else {
          await Poll.findByIdAndUpdate(
            params.id,
            {
              $inc: { upvotes: 1 },
              $push: { upvotedUsers: id },
            },
            { new: true, session }
          );
        }
      }

      // handle downvoting
      if (body.vote === "no") {
        if (hasDownvoted) throw new Error("Already voted against the topic.");
        if (hasUpvoted) {
          await Poll.findByIdAndUpdate(
            params.id,
            {
              $pull: { upvotedUsers: id },
              $inc: { upvotes: -1, downvotes: 1 },
              $push: { downvotedUsers: id },
            },
            { new: true, session }
          );
        } else {
          await Poll.findByIdAndUpdate(
            params.id,
            {
              $inc: { downvotes: 1 },
              $push: { downvotedUsers: id },
            },
            { new: true, session }
          );
        }
      }

      const user = await User.findById(id);

      const votedThisPoll = user.votes?.includes(poll?._id);
      if (!votedThisPoll) {
        user.votes.push(poll._id);
      }

      await user.save({ session });
    } else {
      throw new Error("Invalid vote.");
    }

    await session.commitTransaction();

    return NextResponse.json({ msg: "Voting successful." }, { status: 200 });
  } catch (error) {
    await session.abortTransaction();
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 400 }
    );
  } finally {
    await session.endSession();
  }
}
