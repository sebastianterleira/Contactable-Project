import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import { input } from "../components/input.js";
import { select } from "../components/select.js";
import { createContacts, editContact } from "../services/contacts-service.js";

function render() {
  const { name, number, email, relation } = STORE.edit;
  const { formError } = NewContact.state;

  return `
  <h1>Create new Contact</h1>
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
      
    
      <a class = "js-cancel-form" href = "#">Cancel</a>
      <a class = "js-save-form" href = "#">Save</a>
      </form>
  `;
}

function listenSubmit() {
  const save = document.querySelector(".js-save-form");
  const cancel = document.querySelector(".js-cancel-form");

  cancel.addEventListener("click", async (event) => {
    DOMHandler.load(HomePage);
    STORE.edit = {};
  });

  save.addEventListener("click", async (event) => {
    const { name, number, email, relation } = event.target.parentNode;

    const data = {
      name: name.value,
      number: number.value,
      email: email.value,
      relation: relation.value,
    };

    try {
      let newC;
      if (STORE.edit.id) {
        console.log(data, STORE.edit.id);
        await editContact(data, STORE.edit.id);
        data.id = STORE.edit.id;

        let editableIndex = STORE.contacts.findIndex(
          (item) => item.id === STORE.edit.id
        );

        console.log(editableIndex);
        STORE.contacts.splice(editableIndex, 1, data);
      } else {
        newC = await createContacts(data);
        data.id = newC.id;
        STORE.contacts.push(data);
      }

      DOMHandler.load(HomePage);
      STORE.edit = {};
    } catch (error) {
      console.log(error);
      DOMHandler.reload();
    }

    // try {
    //   const user = await editContact(data);

    //   STORE.user = user;
    //   STORE.currentTab = "expense";
    //   DOMHandler.reload();
    // } catch (error) {
    //   Form.state.formError = error.message;
    //   DOMHandler.reload();
    // }
  });
}

const NewContact = {
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

export default NewContact;
