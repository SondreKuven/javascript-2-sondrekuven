const API_URL = "https://v2.api.noroff.dev/auth/register";

export async function registerUser(user) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors[0].message);
    }

    return data;
  } catch (error) {
    throw error;
  }
}
