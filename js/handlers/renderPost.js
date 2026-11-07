export function renderPost(post, container) {
  container.innerHTML = "";

  const article = document.createElement("article");

  const title = document.createElement("h1");
  title.textContent = post.title || "Untitled post";
  article.appendChild(title);

  if (post.body) {
    const body = document.createElement("p");
    body.textContent = post.body;
    article.appendChild(body);
  }

  if (post.media?.url) {
    const image = document.createElement("img");
    image.src = post.media.url;
    image.alt = post.media.alt || post.title || "Post image";

    image.addEventListener("error", function () {
      image.remove();
    });

    article.appendChild(image);
  }

  container.appendChild(article);

  const username = localStorage.getItem("username");

  if (post.author?.name === username) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete post";
    deleteButton.dataset.id = post.id;
    deleteButton.id = "delete-post-button";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit post";
    editButton.id = "edit-post-button";
    editButton.dataset.id = post.id;

    article.appendChild(deleteButton);
    article.appendChild(editButton);
  }
}
