import { requireLogin } from "./utils/auth.js";
import { initRegisterPage } from "./pages/registerPage.js";
import { initLoginPage } from "./pages/loginPage.js";
import { initFeedPage } from "./pages/feedPage.js";
import { initPostPage } from "./pages/postPage.js";
import { initProfilePage } from "./pages/profilePage.js";

initRegisterPage();
initLoginPage();
initFeedPage();
initPostPage();
initProfilePage();

const logoutButton = document.querySelector("#logout-button");

if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    window.location.href = "./index.html";
  });
}

const protectedPage =
  document.querySelector("#posts-container") || document.querySelector("#post-container") || document.querySelector("#profile-container");

if (protectedPage) {
  requireLogin();
}
