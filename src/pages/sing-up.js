import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import STORE from "../store.js";
import { input } from "../components/input.js";
import { createUser } from "../services/user-services.js"

function render() {
    const { CreateUserError } = this.state; 
    return `
    <main class="section">
      <section class="container">
        <h1 class="heading heading--lg text-center mb-4">Sing Up</h1>
        <form class="flex flex-column gap-4 mb-4 js-singup-form">

				${input({
          label: "email",
          id: "email",
          name: "email",
          placeholder: "nando@example.com",
          type: "email",
          required: true,
          value: "alfredo2@mail.com",
        })}

				${input({
          label: "password",
          id: "password",
          name: "password",
          placeholder: "*****",
          type: "password",
          required: true,
          value: "4321",
        })}

				${CreateUserError ? `<p class="text-center error-300">${CreateUserError}</p>` : ""}
					<button class="button button--primary">Create Account</button>
        </form>
      </section>
    </main>
    `;
}

function listenerSingUp() {
	const form = document.querySelector(".js-singup-form");

	form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
  
      const { email, password } = event.target;
  
      const credentials = {
        email: email.value,
        password: password.value,
      };
  
      const user = await createUser(credentials);
      STORE.user = user

      await STORE.fetchContacts();
  
      DOMHandler.load(HomePage);
    } catch (error) {
        this.state.CreateUserError = error.message;
        DOMHandler.reload();
    }
	});
}

const CreateUser = {
	toString() {
    return render.call(this);
  },
  addListeners() {
		listenerSingUp();
  },
  state: {
    CreateUserError: null,
  },
}

export default CreateUser;