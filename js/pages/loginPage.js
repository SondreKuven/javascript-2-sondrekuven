import { loginUser } from "../api/auth/login.js";

export function initLoginPage() {
  const loginForm = document.querySelector("#login-form");

  if (!loginForm) {
    return;
  }

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    const user = {
      email,
      password,
    };

    const message = document.querySelector("#login-message");

    try {
      const result = await loginUser(user);

      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("username", result.data.name);

      window.location.href = "./feed.html";
    } catch (error) {
      message.textContent = error.message;
    }
  });
}
