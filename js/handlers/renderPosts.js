export function renderPosts(posts, container) {
  container.innerHTML = "";

  posts.forEach(function (post) {
    const article = document.createElement("article");
    const title = document.createElement("h2");
    const link = document.createElement("a");

    link.textContent = post.title || "Untitled post";
    link.href = `./post.html?id=${post.id}`;

    title.appendChild(link);
    article.appendChild(title);

    if (post.author) {
      const authorLink = document.createElement("a");

      authorLink.textContent = `By ${post.author.name}`;
      authorLink.href = `./profile.html?name=${post.author.name}`;

      article.appendChild(authorLink);
    }

    if (post.body) {
      const body = document.createElement("p");
      body.textContent = post.body;

      article.appendChild(body);
    }

    if (post.media?.url) {
      const image = document.createElement("img");

      image.src = post.media.url;
      image.alt = post.media.alt || post.tilte || "Post image";

      image.addEventListener("error", function () {
        image.remove();
      });

      article.appendChild(image);
    }
    container.appendChild(article);
  });
}
