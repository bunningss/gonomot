import User from "@/lib/models/User";
import { connectDb } from "@/lib/db/connect-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDb();

    const user = await User.findById(params.id)
      .select("userType permissions")
      .lean();

    if (!user) throw new Error("You are not authorized.");
    return NextResponse.json(
      { msg: "Role Found.", payload: user },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: (err as Error).message }, { status: 400 });
  }
}
