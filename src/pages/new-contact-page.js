import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import { input } from "../components/input.js";
import { select } from "../components/select.js";
import { createContacts, editContact } from "../services/contacts-service.js";
import Header from "./layout/header.js";
import LoginPage from "./login-page.js";
import { logout } from "../services/sessions-service.js";

function render() {
  const { name, number, email, favorite, relation } = STORE.edit;
  const { formError } = NewContact.state;

  const title = `${STORE.edit.id ? "Edit" : "Create new"} contact`;
  STORE.header = { title };

  return `
    ${Header}
    <form class="flex flex-column gap-4 mb-4 js-profile-form">
      ${input({
        id: "name",
        placeholder: "Name",
        required: true,
        value: name,
        name: "name",
      })}
      ${
        formError.name
          ? `<p class="error-300">${formError.name.join(", ")}</p>`
          : ""
      }
      ${input({
        id: "number",
        placeholder: "Number",
        value: number,
        name: "number",
      })}
      ${
        formError.number
          ? `<p class="error-300">${formError.number.join(", ")}</p>`
          : ""
      }
      ${input({
        id: "email",
        placeholder: "Email",
        type: "email",
        required: true,
        value: email,
        name: "email",
      })}
      ${input({
        id: "favorite",
        value: favorite ? favorite : "false",
        name: "favorite",
        classes: "hide",
      })}
      ${
        formError.email
          ? `<p class="error-300">${formError.email.join(", ")}</p>`
          : ""
      }
      ${select({
        id: "relation",
        name: relation,
        selected: relation,
      })}
      
        <div class="contactable__actions">
          <a class="js-cancel-form" href = "#">Cancel</a>
          <a class="js-save-form" href = "#">Save</a>
        </div>
      </form>`;
}

const NewContact = {
  toString() {
    return render();
  },
  addListeners() {
    STORE.listenSubmit();
    STORE.listenLogout();
  },
  state: {
    formError: false,
  },
};

export default NewContact;
