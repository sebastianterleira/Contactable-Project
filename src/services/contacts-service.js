import apiFetch from "./api-fetch.js";

export async function getContacts() {
	return await apiFetch("contacts");
}

export async function createContacts( 
	newContact = { name, email, number, relation }
) {
	return await apiFetch("contacts", { body: newContact });
}

export async function deleteContact(id) {
	return await apiFetch(`contacts/${id}`, { method: "DELETE" });
}
