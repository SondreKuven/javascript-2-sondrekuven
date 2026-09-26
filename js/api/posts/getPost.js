import { API_BASE_URL, API_KEY } from "../../utils/constants.js";


/**
 * Fetches one post from the API using its ID.
 * @param {string|number} id - The ID of the post to retreive.
 * @returns {Promise<Object>} The API response containg the post data.
 * @throws {Error} Throws an error if the request fails.
 */
export async function getPost(id) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/social/posts/${id}?_author=true`, {
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
