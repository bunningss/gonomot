import bcrypt from "bcrypt";
import User from "@/lib/models/User";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/lib/db/connect-db";
import { signToken } from "@/utils/auth";
import { messages } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { phone, password } = await request.json();

    const userExist = await User.findOne({ phone }).collation({
      locale: "en",
      strength: 2,
    });

    if (!userExist)
      return NextResponse.json(
        { msg: messages.auth.invalidCredentials },
        { status: 400 }
      );

    const validPass = await bcrypt.compare(password, userExist.password);
    if (!validPass)
      return NextResponse.json(
        { msg: messages.auth.invalidCredentials },
        { status: 400 }
      );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userDetails } = userExist._doc;

    const token = await signToken(userDetails);

    return NextResponse.json(
      {
        msg: "Login successful.",
        payload: token,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: (err as Error).message }, { status: 500 });
  }
}
