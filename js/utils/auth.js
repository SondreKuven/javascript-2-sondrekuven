export function requireLogin() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    window.location.href = "./index.html";
  }
}
