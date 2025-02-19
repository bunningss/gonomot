"use server";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { getEnv } from "./get-env";
import { getCookie, setCookie } from "./cookie";
import { messages, siteSettings } from "@/lib/constants";
import { NextRequest } from "next/server";
import { fetchData } from "./api-methods";
import { ObjectId } from "mongoose";

// Check user session only
export async function getSession() {
  const session = await getCookie(siteSettings.cookieName);

  if (!session)
    return {
      error: true,
      payload: null,
    };

  try {
    const verifiedToken = await jwtVerify(
      session,
      new TextEncoder().encode(getEnv("TOKEN_SECRET")),
      {
        algorithms: ["HS256"],
      }
    );

    return {
      error: false,
      payload: verifiedToken.payload as JWTPayload,
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      payload: null,
    };
  }
}

// Extract token from request header
export async function extractToken(request: NextRequest) {
  const token = request.headers.get("auth-token");

  if (token?.split(" ")[1] && token.startsWith("Bearer ")) {
    const sessionKey = token.split(" ")[1];

    try {
      return await jwtVerify(
        sessionKey,
        new TextEncoder().encode(getEnv("TOKEN_SECRET")),
        {
          algorithms: ["HS256"],
        }
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  } else {
    return null;
  }
}

// Verify user token from requests
export async function verifyToken(request: NextRequest, action: string) {
  try {
    if (!action) throw new Error(messages.unauthorized);

    const verifiedToken = await extractToken(request);
    if (!verifiedToken) throw new Error(messages.unauthorized);

    const isAllowed = await hasPermission(
      action,
      verifiedToken?.payload?._id as ObjectId
    );
    if (!isAllowed) throw new Error(messages.unauthorized);

    return {
      error: false,
      payload: verifiedToken.payload,
      id: verifiedToken.payload?._id,
      userType: verifiedToken.payload?.userType,
    };
  } catch (err) {
    throw new Error((err as Error).message);
  }
}

// Verify user permission
export async function hasPermission(action: string, id: ObjectId) {
  const { response } = await fetchData(`auth/get-role/${id}`, 0);

  const permissions = response.payload?.permissions;

  if (permissions?.length <= 0) {
    return false;
  }

  if (permissions?.includes("manage:all")) {
    return true;
  }

  if (!permissions?.includes(action)) {
    return false;
  }

  return true;
}

// Sign JWT
export async function signToken(data: Record<string, unknown>) {
  if (!data) throw new Error("Login process failed.");

  const expiry = getEnv("TOKEN_EXPIRY_TIME")!;
  const secretKey = new TextEncoder().encode(getEnv("TOKEN_SECRET"));

  return await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${expiry}s`)
    .sign(secretKey);
}

// Logout
export async function logout() {
  await setCookie(siteSettings.cookieName, "", 0);
}
