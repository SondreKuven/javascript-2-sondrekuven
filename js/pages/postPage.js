import { getPost } from "../api/posts/getPost.js";
import { renderPost } from "../handlers/renderPost.js";
import { deletePost } from "../api/posts/deletePost.js";
import { updatePost } from "../api/posts/updatePost.js";

export function initPostPage() {
  const postContainer = document.querySelector("#post-container");

  if (!postContainer) {
    return;
  }

  loadPost();

  async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
      postContainer.textContent = "No post ID was provided.";
      return;
    }

    try {
      const result = await getPost(id);

      renderPost(result.data, postContainer);

      setupDeleteButton();
      setupEditButton(result.data);
    } catch (error) {
      postContainer.textContent = error.message;
    }
  }

  function setupDeleteButton() {
    const deleteButton = document.querySelector("#delete-post-button");

    if (!deleteButton) {
      return;
    }

    deleteButton.addEventListener("click", async function () {
      const id = deleteButton.dataset.id;

      try {
        await deletePost(id);

        window.location.href = "./feed.html";
      } catch (error) {
        console.error(error);
      }
    });
  }

  function setupEditButton(post) {
    const editButton = document.querySelector("#edit-post-button");

    if (!editButton) {
      return;
    }

    editButton.addEventListener("click", function () {
      showEditForm(post);
    });
  }

  function showEditForm(post) {
    postContainer.innerHTML = "";

    const form = document.createElement("form");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = post.title || "";

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    titleLabel.htmlFor = "edit-title";

    titleInput.id = "edit-title";
    titleInput.required = true;

    const bodyInput = document.createElement("textarea");
    bodyInput.value = post.body || "";

    const bodyLabel = document.createElement("label");
    bodyLabel.textContent = "Body";
    bodyLabel.htmlFor = "edit-body";

    bodyInput.id = "edit-body";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Save changes";

    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(bodyLabel);
    form.appendChild(bodyInput);
    form.appendChild(submitButton);

    postContainer.appendChild(form);

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const updatedPost = {
        title: titleInput.value,
        body: bodyInput.value,
      };

      try {
        await updatePost(post.id, updatedPost);

        await loadPost();
      } catch (error) {
        console.error(error);
      }
    });
  }
}
