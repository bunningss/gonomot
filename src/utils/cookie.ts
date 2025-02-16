"use server";
import { cookies } from "next/headers";
import { getEnv } from "./get-env";

export async function setCookie(name: string, value: string, expiry?: number) {
  cookies().set(name, value, {
    maxAge: expiry ? Number(expiry) : Number(getEnv("TOKEN_EXPIRY_TIME")),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getCookie(name: string) {
  return cookies().get(name)?.value;
}
