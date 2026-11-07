export function renderProfile(profile, container) {
  container.innerHTML = "";

  const name = document.createElement("h2");
  name.textContent = profile.name;

  container.appendChild(name);

  if (profile.avatar?.url) {
    const avatar = document.createElement("img");

    avatar.src = profile.avatar.url;
    avatar.alt = profile.avatar.alt || `${profile.name}'s avatar`;

    container.appendChild(avatar);
  }

  if (profile.bio) {
    const bio = document.createElement("p");
    bio.textContent = profile.bio;

    container.appendChild(bio);
  }

  const counts = document.createElement("p");

  counts.textContent = `Posts: ${profile._count.posts} | ` + `Followers: ${profile._count.followers} | ` + `Following: ${profile._count.following}`;

  container.appendChild(counts);
}
