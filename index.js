import DOMHandler from "./src/dom-handler.js";
import LoginPage from "./src/pages/login-page.js";
import HomePage from "./src/pages/home-page.js";
import STORE from "./src/store.js";
import { tokenKey } from "./src/config.js";
import { getContacts } from "./src/services/contacts-service.js";

async function init() {
  try {
    // const token = sessionStorage.getItem(tokenKey);
    // if (!token) return DOMHandler.load(LoginPage);

    const user = await getContacts();
    // STORE.contactx = await getContacts();
    // await STORE.fetchContacts();
    // console.log(STORE.fetchContacts());
    DOMHandler.load(HomePage);
  } catch (error) {
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage);
  }
}

sessionStorage.setItem(tokenKey, "jCYPWpe5UufQ7mbkfEBmpzNH");

init();
