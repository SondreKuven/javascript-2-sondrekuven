import { API_BASE_URL, API_KEY } from "../../utils/constants.js";


/**
 * Creates a new social media post.
 * @param {Object} post - The Post data to create
 * @param {string} post.title - The title of the post.
 * @param {string} [post.body] - Optional body text of the post.
 * @param {Object} [post.media] - Optional media object.
 * @returns {Promise<Object>} The API reponse containg the created post.
 * @throws {Error} Throws an error if the request fails.
 */
export async function createPost(post) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/social/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(post),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors[0].message);
  }

  return data;
}
