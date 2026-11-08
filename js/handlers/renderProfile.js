export function renderProfile(profile, container) {
  container.innerHTML = "";

  const header = document.createElement("div");
  header.className = "d-flex flex-column flex-sm-row align-items-center gap-4 mb-4";

  if (profile.avatar?.url) {
    const avatar = document.createElement("img");
    avatar.className = "profile-avatar";

    avatar.src = profile.avatar.url;
    avatar.alt = profile.avatar.alt || `${profile.name}'s avatar`;

    avatar.addEventListener("error", function () {
      avatar.remove();
    });

    header.appendChild(avatar);
  }

  const profileInfo = document.createElement("div");
  profileInfo.className = "text-center text-sm-start";

  const name = document.createElement("h2");
  name.className = "h3 mb-2";
  name.textContent = profile.name;

  profileInfo.appendChild(name);

  if (profile.bio) {
    const bio = document.createElement("p");
    bio.className = "text-body-secondary mb-0";
    bio.textContent = profile.bio;

    profileInfo.appendChild(bio);
  }

  header.appendChild(profileInfo);
  container.appendChild(header);

  const counts = document.createElement("div");
  counts.className = "d-flex flex-wrap justify-content-around gap-3 border-top pt-3";

  const stats = [
    { label: "Posts", value: profile._count?.posts ?? 0 },
    { label: "Followers", value: profile._count?.followers ?? 0 },
    { label: "Following", value: profile._count?.following ?? 0 },
  ];

  stats.forEach(function (stat) {
    const statItem = document.createElement("div");
    statItem.className = "text-center";

    const number = document.createElement("p");
    number.className = "h5 mb-1";
    number.textContent = stat.value;

    const label = document.createElement("p");
    label.className = "text-body-secondary small mb-0";
    label.textContent = stat.label;

    statItem.appendChild(number);
    statItem.appendChild(label);
    counts.appendChild(statItem);
  });

  container.appendChild(counts);
}
