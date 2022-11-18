// Crear el Login y el Logout
const BASE_URI = "https://contactable-api.herokuapp.com";
const tokenKey = "contactable_token";

export async function login(credentials = { email, password }) {
    const response = await fetch(`${BASE_URI}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errors);
    }

    const data = await response.json();
    sessionStorage.setItem(tokenKey, data.token);

    return data;
}

export async function logout() {
	const token = sessionStorage.getItem(tokenKey);

	const response = await fetch(`${BASE_URI}/logout`, {
			method: "DELETE",
			headers: {
				Authorization: `Token token=${token}`,
				"Content-Type": "application/json",
			},
	});

	let data;
	try {
		data = await response.json();
	} catch (error) {
		data = response.statusText;
	}
	
	if (!response.ok) {
		throw new Error(data.errors);
	}

	sessionStorage.removeItem(tokenKey);

	return data;
}