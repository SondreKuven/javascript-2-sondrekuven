import { API_BASE_URL, API_KEY } from "../../utils/constants.js";

/**
 * Updates an existing social media post
 * @param {string|number} id - The ID of the post to update.
 * @param {Object} post - The updated post data.
 * @param {string} post.title - The updated title.
 * @param {string} [post.body] - The updated body text.
 * @returns {Promise<Object>} The API reponse containing the updated post.
 * @throws {Error} Throws an error if the request fails.
 */
export async function updatePost(id, post) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/social/posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  const data = await response.json();

  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    throw new Error("Your login has expired. Please log in again.");
  }

  if (!response.ok) {
    throw new Error(data.errors[0].message);
  }

  return data;
}
