const API_URL = "https://v2.api.noroff.dev/auth/login";

export async function loginUser(user) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.errors[0].message);
    }

    return data;
}