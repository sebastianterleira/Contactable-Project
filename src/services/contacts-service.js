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

export async function editContact(
  data = { name, number, email, relation, favorite: false },
  id
) {
  console.log(data, id);
  const { token, ...user } = await apiFetch(`contacts/${id}`, {
    method: "PATCH",
    body: data,
  });

  return user;
}

export async function updateFavoriteContact(id, favorite) {
  console.log(favorite);
  return await apiFetch(`contacts/${id}`, {
    method: "PATCH",
    body: { favorite: favorite },
  });
}
