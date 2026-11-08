export function renderPosts(posts, container) {
  container.innerHTML = "";

  posts.forEach(function (post) {
    const article = document.createElement("article");
    article.className = "card shadow-sm border-0 post-card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body p-4";

    const title = document.createElement("h2");
    title.className = "card-title h5 mb-2";

    const link = document.createElement("a");
    link.className = "text-decoration-none link-body-emphasis";
    link.textContent = post.title || "Untitled post";
    link.href = `./post.html?id=${post.id}`;

    title.appendChild(link);
    cardBody.appendChild(title);

    if (post.author) {
      const authorLink = document.createElement("a");

      authorLink.className = "small text-body-secondary text-decoration-none";
      authorLink.textContent = `By ${post.author.name}`;
      authorLink.href = `./profile.html?name=${encodeURIComponent(post.author.name)}`;

      cardBody.appendChild(authorLink);
    }

    if (post.body) {
      const body = document.createElement("p");
      body.className = "card-text mt-3 mb-0";
      body.textContent = post.body;

      cardBody.appendChild(body);
    }

    article.appendChild(cardBody);

    if (post.media?.url) {
      const image = document.createElement("img");

      image.className = "card-img-bottom post-image";
      image.src = post.media.url;
      image.alt = post.media.alt || post.title || "Post image";

      image.addEventListener("error", function () {
        image.remove();
      });

      article.appendChild(image);
    }
    container.appendChild(article);
  });
}
