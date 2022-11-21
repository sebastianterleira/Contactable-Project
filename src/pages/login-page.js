import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import STORE from "../store.js";
import { input } from "../components/input.js";
import { login } from "../services/sessions-service.js";
import Header from "./layout/header.js";

function render() {
  const { loginError } = this.state;
  return `
    <main class="section">
      <section class="container">
        <h1 class="heading heading--lg text-center mb-4">Login</h1>
        <form class="flex flex-column gap-4 mb-4 js-login-form">

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
					
				${loginError ? `<p class="text-center error-300">${loginError}</p>` : ""}
					<button class="button button--primary">Login</button>
        </form>
        <a href="#" class="block text-center js-signup-link">Create account</a>
      </section>
    </main>
    `;
}

function ListenSubmitForm() {
  const form = document.querySelector(".js-login-form");

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();

      const { email, password } = event.target;

      const credentials = {
        email: email.value,
        password: password.value,
      };

      const user = await login(credentials);
      STORE.user = user;

      await STORE.fetchContacts();
      // STORE.contacts = await STORE.fetchContacts();

      DOMHandler.load(HomePage);
    } catch (error) {
      this.state.loginError = error.message;
      DOMHandler.reload();
    }
  });
}

const LoginPage = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    ListenSubmitForm.call(this);
  },
  state: {
    loginError: null,
  },
};

export default LoginPage;
