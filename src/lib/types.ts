import { JWTPayload } from "jose";

export interface UserDataProps {
  error: boolean;
  payload: null | JWTPayload;
}
