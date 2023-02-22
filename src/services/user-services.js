import { tokenKey } from "../config.js";
import apiFetch from "./api-fetch.js";

export async function createUser(newUSer = { email, password }) {
	const { token, ...user } = await apiFetch("signup", { body: newUSer });
	sessionStorage.setItem(tokenKey, token);

	return user;
}
