import { fetchData } from "./api-methods";

// Fetch all polls
export async function fetchPolls() {
  const { response } = await fetchData("polls", 0);

  return response.payload;
}
