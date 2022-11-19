import DOMHandler from "./src/dom-handler.js";
import LoginPage from "./src/pages/login-page.js";
import HomePage from "./src/pages/home-page.js";
import { tokenKey } from "./src/config.js";
import { getContacts } from "./src/services/contacts-service.js";
import { login } from "./src/services/sessions-service.js";

async function init() {
	try {
		const token = sessionStorage.getItem(tokenKey);
		if (!token) throw new Error();
	
		const user = await getContacts();
		console.log(user);
		DOMHandler.load(HomePage);
	} catch (error) {
		sessionStorage.removeItem(tokenKey);
		DOMHandler.load(LoginPage);
	}
}

init()

// login({
// 	"email": "seb.terleira1204@mail.com",
// 	"password": "1234567"
// }).then(() => init())















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