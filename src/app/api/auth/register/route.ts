import bcrypt from "bcrypt";
import User from "@/lib/models/User";
import { connectDb } from "@/lib/db/connect-db";
import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const body = await request.json();

    if (body.password.trim().length < 8)
      return NextResponse.json(
        { msg: messages.password.lengthError },
        { status: 400 }
      );

    if (body.password !== body.confirmPassword)
      return NextResponse.json(
        { msg: messages.password.noMatch },
        { status: 400 }
      );

    const emailExist = await User.findOne({ phone: body.phone });
    if (emailExist) {
      return NextResponse.json(
        {
          msg: messages.auth.emailExistError,
        },
        { status: 400 }
      );
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Creating new user
    const newUser = new User({
      ...body,
      password: hashedPassword,
      permissions: [],
    });

    await newUser.save();

    return NextResponse.json(
      { msg: messages.auth.accountCreationSuccess },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ msg: (err as Error).message }, { status: 400 });
  }
}
