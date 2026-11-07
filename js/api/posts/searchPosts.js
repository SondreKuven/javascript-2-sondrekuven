import { API_BASE_URL, API_KEY } from "../../utils/constants.js";

export async function searchPosts(query) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/social/posts/search?q=${encodeURIComponent(query)}&_author=true`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors[0].message);
  }

  return data;
}
