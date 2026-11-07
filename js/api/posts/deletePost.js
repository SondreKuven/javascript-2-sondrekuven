import { API_BASE_URL, API_KEY } from "../../utils/constants.js";

export async function deletePost(id) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/social/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.errors[0].message);
  }
}
