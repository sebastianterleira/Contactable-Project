import { login, logout } from "./src/services/sessions-service.js";

const crendentials = {
	email: "seb.terleira1204@mail.com",
	password: "123456",
};

async function test() {
	try {
		const user = await login(crendentials);
		console.log(user);
		
		const data = await logout(); 
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}

test();
















// login(crendentials)
// 	.then((user) => console.log(user))
// 	.catch((error) => console.log(error));