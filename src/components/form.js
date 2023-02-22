import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { input } from "./input.js";
import { select } from "./select.js";
import { editContact } from "../services/contacts-service.js";

function render() {
  const { name, number, email, relation } = STORE.user;
  const { formError } = FORM.state;

  return `
    <form class="flex flex-column gap-4 mb-4 js-profile-form">
      ${input({
        placeholder: "Name",
        required: true,
        value: name,
        name: "name",
      })}
      ${input({

        placeholder: "Number",
        value: number,
        name: "number",
      })}
      ${input({
        placeholder: "Email",
        type: "email",
        required: true,
        value: email,
        name: "email",
      })}
      ${select({
        name: relation
      })}
      
      ${formError ? `<p class="text-center error-300">${formError}</p>` : ""}
      <a class = "js-cancel-contact" href = "#">Cancel</a>
      <a class = "js-save-contact" href = "#">Save</a>
      </form>
  `;
}

function listenSubmit() {
  const form = document.querySelector(".js-profile-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { email, first_name, last_name, phone } = event.target;

    const data = {
      email: email.value,
      name: name.value,
      last_name: last_name.value,
      phone: phone.value,
    };

    try {
      const user = await editContact(data);

      STORE.user = user;
      STORE.currentTab = "expense";
      DOMHandler.reload();
    } catch (error) {
      Form.state.formError = error.message;
      DOMHandler.reload();
    }
  });
}

const Form = {
  toString() {
    return render();
  },
  addListeners() {
    listenSubmit();
  },
  state: {
    formError: false,
  },
};

export default Form;
