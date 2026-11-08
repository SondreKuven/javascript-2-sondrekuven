export function renderPost(post, container) {
  container.innerHTML = "";

  const article = document.createElement("article");
  article.className = "card shadow.sm border-0";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body p-4";

  const title = document.createElement("h1");
  title.className = "card-title h3 mb-3";
  title.textContent = post.title || "Untitled post";
  cardBody.appendChild(title);

  if (post.author?.name) {
    const author = document.createElement("p");
    author.className = "text-body-secondary small mb-3";
    author.textContent = `By ${post.author.name}`;
    cardBody.appendChild(author);
  }

  if (post.body) {
    const body = document.createElement("p");
    body.className = "card-text mb-4";
    body.textContent = post.body;
    cardBody.appendChild(body);
  }

  if (post.media?.url) {
    const image = document.createElement("img");
    image.className = "img-fluid rounded post-detail-image";
    image.src = post.media.url;
    image.alt = post.media.alt || post.title || "Post image";

    image.addEventListener("error", function () {
      image.remove();
    });

    cardBody.appendChild(image);
  }

  const username = localStorage.getItem("username");

  if (post.author?.name === username) {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "d-flex flex-wrap gap-2 mt-4";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit post";
    editButton.id = "edit-post-button";
    editButton.dataset.id = post.id;
    editButton.type = "button";
    editButton.className = "btn btn-outline-primary";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete post";
    deleteButton.dataset.id = post.id;
    deleteButton.id = "delete-post-button";
    deleteButton.type = "button";
    deleteButton.className = "btn btn-outline-danger";

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    cardBody.appendChild(buttonContainer);
  }

  article.appendChild(cardBody);
  container.appendChild(article);
}
