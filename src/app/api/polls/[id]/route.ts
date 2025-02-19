import Poll from "@/lib/models/Poll";
import { connectDb } from "@/lib/db/connect-db";
import { NextRequest, NextResponse } from "next/server";

// Fetch one poll
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const poll = await Poll.findById(params.id).lean();

    return NextResponse.json(
      { msg: "Poll found.", payload: poll },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: (error as Error).message },
      { status: 400 }
    );
  }
}
