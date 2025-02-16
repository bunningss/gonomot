import { JWTPayload } from "jose";
import { Document } from "mongoose";

export interface UserDataProps {
  error: boolean;
  payload: null | JWTPayload;
}

export interface IPoll {
  title: string;
  description: string;
  upvotes: number;
  downvotes: number;
}

export type PollDocument = IPoll & Document;
