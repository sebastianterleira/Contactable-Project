import DOMHandler from "./src/dom-handler.js";
import LoginPage from "./src/pages/login-page.js";
import { tokenKey } from "./src/config.js";
import { getContacts } from "./src/services/contacts-service.js"

async function init() {
	const token = sessionStorage.getItem(tokenKey);
	if (!token) return DOMHandler.load(LoginPage);

	const user = await getContacts();
	console.log(user);
}

sessionStorage.setItem(tokenKey, "BQwWAVZAbzXkfoPXN2c2cnB4");
init()















// login(crendentials)
// 	.then((user) => console.log(user))
// 	.catch((error) => console.log(error));
// import { login, logout } from "./src/services/sessions-service.js";

// const credentials = {
// 	email: "seb.terleira1204@mail.com",
// 	password: "123456",
// };

// async function test() {
// 	try {
// 		const user = await login(credentials);
// 		console.log(user);
		
// 		const data = await logout(); 
// 		console.log(data);
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// test();