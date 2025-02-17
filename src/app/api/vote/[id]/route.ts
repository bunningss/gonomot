import { connectDb } from "@/lib/db/connect-db";
import Poll from "@/lib/models/Poll";
import { verifyToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

// Cast a vote
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();
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
            { new: true }
          );
        } else {
          await Poll.findByIdAndUpdate(
            params.id,
            {
              $inc: { upvotes: 1 },
              $push: { upvotedUsers: id },
            },
            { new: true }
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
            { new: true }
          );
        } else {
          await Poll.findByIdAndUpdate(
            params.id,
            {
              $inc: { downvotes: 1 },
              $push: { downvotedUsers: id },
            },
            { new: true }
          );
        }
      }
    }

    return NextResponse.json({ msg: "Voting successful." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 400 }
    );
  }
}
