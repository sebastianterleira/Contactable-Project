import DOMHandler from "./src/dom-handler.js";
import LoginPage from "./src/pages/login-page.js";
import HomePage from "./src/pages/home-page.js";
import { tokenKey } from "./src/config.js";
import { getContacts } from "./src/services/contacts-service.js";
import { login } from "./src/services/sessions-service.js";
import STORE from "./src/store.js"

async function init() {
	try {
		const token = sessionStorage.getItem(tokenKey);
		if (!token) throw new Error();
		await STORE.fetchContacts();
		DOMHandler.load(HomePage);
	} catch (error) {
		sessionStorage.removeItem(tokenKey);
		DOMHandler.load(LoginPage);
	}
}

init()
