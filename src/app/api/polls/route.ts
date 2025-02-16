import Poll from "@/lib/models/Poll";
import { connectDb } from "@/lib/db/connect-db";
import { verifyToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    await verifyToken(request, "create:poll");

    const body = await request.json();

    const newPoll = await new Poll(body);

    await newPoll.save();

    return NextResponse.json(
      { msg: "Poll created successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 400 }
    );
  }
}
