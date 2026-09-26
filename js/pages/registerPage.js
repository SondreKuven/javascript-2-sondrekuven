import { registerUser } from "../api/auth/register.js";

export function initRegisterPage() {
  const registerForm = document.querySelector("#register-form");

  if (!registerForm) {
    return;
  }

  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const message = document.querySelector("#message");

    const user = {
      name: name,
      email: email,
      password: password,
    };

    try {
      await registerUser(user);

      message.textContent = "Registations successful!";
    } catch (error) {
      message.textContent = error.message;
    }
  });
}
