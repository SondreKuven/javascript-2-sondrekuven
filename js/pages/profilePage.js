import { renderPosts } from "../handlers/renderPosts.js";
import { followUser } from "../api/profiles/followUser.js";
import { getProfile } from "../api/profiles/getProfile.js";
import { getProfilePosts } from "../api/profiles/getProfilePosts.js";
import { unfollowUser } from "../api/profiles/unfollowUser.js";
import { renderProfile } from "../handlers/renderProfile.js";

export function initProfilePage() {
  const profileContainer = document.querySelector("#profile-container");
  const profilePostsContainer = document.querySelector("#profile-posts");

  if (!profileContainer) {
    return;
  }

  loadProfile();

  async function loadProfile() {
    const params = new URLSearchParams(window.location.search);

    const profileName = params.get("name") || localStorage.getItem("username");

    try {
      const profileResult = await getProfile(profileName);
      const postsResult = await getProfilePosts(profileName);

      const profile = profileResult.data;

      renderProfile(profileResult.data, profileContainer);
      renderPosts(postsResult.data, profilePostsContainer);

      setupFollowButton(profile);
    } catch (error) {
      console.error(error);
    }
  }

  function setupFollowButton(profile) {
    const loggedInUser = localStorage.getItem("username");

    if (profile.name === loggedInUser) {
      return;
    }

    const isFollowing = profile.followers?.some(function (follower) {
      return follower.name === loggedInUser;
    });

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = isFollowing ? "Unfollow" : "Follow";

    button.className = isFollowing ? "btn btn-outline-secondary mt-4" : "btn btn-primary mt-4";

    button.addEventListener("click", async function () {
      try {
        if (isFollowing) {
          await unfollowUser(profile.name);
        } else {
          await followUser(profile.name);
        }

        await loadProfile();
      } catch (error) {
        console.error(error);
      }
    });

    profileContainer.appendChild(button);
  }
}
