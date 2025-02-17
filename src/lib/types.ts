import { JWTPayload } from "jose";
import { Document, Types } from "mongoose";

export interface UserDataProps {
  error: boolean;
  payload: null | JWTPayload;
}

export interface IPoll {
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
  upvotedUsers: Types.ObjectId[];
  downvotedUsers: Types.ObjectId[];
}

export type PollDocument = IPoll & Document;
