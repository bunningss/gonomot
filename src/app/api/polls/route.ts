import User from "@/lib/models/User";
import mongoose from "mongoose";
import Poll from "@/lib/models/Poll";
import { connectDb } from "@/lib/db/connect-db";
import { verifyToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

// Create new poll
export async function POST(request: NextRequest) {
  await connectDb();
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { id } = await verifyToken(request, "create:poll");

    const body = await request.json();

    const durationDays = Number(body.durationDays);

    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.setDate(currentDate.getDate() + durationDays)
    );

    const newPoll = await new Poll({ ...body, duration: expirationDate });

    await User.findByIdAndUpdate(
      id,
      {
        $push: { polls: newPoll._id },
      },
      {
        new: true,
        session,
      }
    );

    await newPoll.save({ session });

    await session.commitTransaction();

    return NextResponse.json(
      { msg: "Poll created successfully." },
      { status: 200 }
    );
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

// Fetch all polls
export async function GET() {
  try {
    await connectDb();

    const polls = await Poll.find()
      .sort({ createdAt: -1 })
      .select("-upvotedUsers -downvotedUsers")
      .lean();

    return NextResponse.json(
      { msg: "Polls found.", payload: polls },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 400 }
    );
  }
}
