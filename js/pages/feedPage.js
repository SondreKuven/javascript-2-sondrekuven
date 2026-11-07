import { getPosts } from "../api/posts/getPosts.js";
import { renderPosts } from "../handlers/renderPosts.js";
import { searchPosts } from "../api/posts/searchPosts.js";
import { createPost } from "../api/posts/createPost.js";

export function initFeedPage() {
  const postsContainer = document.querySelector("#posts-container");

  if (!postsContainer) {
    return;
  }

  loadPosts();

  async function loadPosts() {
    try {
      const result = await getPosts();

      renderPosts(result.data, postsContainer);
    } catch (error) {
      console.log(error);
    }
  }

  const createPostForm = document.querySelector("#create-post-form");

  if (createPostForm) {
    createPostForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const title = document.querySelector("#post-title").value;
      const body = document.querySelector("#post-body").value;
      const imageUrl = document.querySelector("#post-image").value;

      const post = {
        title,
        body,
      };

      if (imageUrl) {
        post.media = {
          url: imageUrl,
          alt: title,
        };
      }

      const message = document.querySelector("#create-post-message");

      try {
        await createPost(post);

        message.textContent = "Post created!";

        createPostForm.reset();

        await loadPosts();
      } catch (error) {
        message.textContent = error.message;
      }
    });
  }

  const searchForm = document.querySelector("#search-form");

  if (searchForm) {
    searchForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const searchInput = document.querySelector("#search-input");
      const query = searchInput.value.trim();

      try {
        if (!query) {
          await loadPosts();
          return;
        }

        const result = await searchPosts(query);

        renderPosts(result.data, postsContainer);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
