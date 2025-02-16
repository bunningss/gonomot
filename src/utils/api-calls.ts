import { fetchData } from "./api-methods";

// Fetch all polls
export async function fetchPolls() {
  const { response } = await fetchData("polls", 0);

  return response.payload;
}

// Fetch poll
export async function fetchPoll(id: string) {
  const { response } = await fetchData(`polls/${id}`, 0);

  return response.payload;
}
