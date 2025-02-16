import User from "@/lib/models/User";
import mongoose from "mongoose";
import Poll from "@/lib/models/Poll";
import { connectDb } from "@/lib/db/connect-db";
import { verifyToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDb();
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const { id } = await verifyToken(request, "create:poll");

    const body = await request.json();

    const newPoll = await new Poll(body);

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
