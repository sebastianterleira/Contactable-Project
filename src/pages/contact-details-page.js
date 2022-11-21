import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import HomePage from "./home-page.js";
import { input } from "../components/input.js";
import { select } from "../components/select.js";
import { createContacts, editContact } from "../services/contacts-service.js";

function render() {
  const { name, number, email, favorite, relation } = STORE.details;
  const { formError } = ContactDetails.state;
  return `
    <h1>Contact Details</h1>
    <div class="contact__details">
        <img src="./assets/empty.png" alt="" class="contact__details-img" />
      <div>${name}</div>
      <div>${relation}</div>
      <br />
      <div>Number: ${number}</div>
      <div>Email: ${email}</div>

    </div>
    `;
}

function listenSubmit() {
  // const save = document.querySelector(".js-save-form");
  // const cancel = document.querySelector(".js-cancel-form");
  // cancel.addEventListener("click", async (event) => {
  //   DOMHandler.load(HomePage);
  //   STORE.edit = {};
  // });
  // save.addEventListener("click", async (event) => {
  //   const { name, number, email, favorite, relation } = event.target.parentNode;
  //   const data = {
  //     name: name.value,
  //     number: number.value,
  //     email: email.value,
  //     favorite: JSON.parse(favorite.value),
  //     relation: relation.value,
  //   };
  //   try {
  //     let newC;
  //     if (STORE.edit.id) {
  //       await editContact(data, STORE.edit.id);
  //       data.id = STORE.edit.id;
  //       let editableIndex = STORE.contacts.findIndex(
  //         (item) => item.id === STORE.edit.id
  //       );
  //       STORE.contacts.splice(editableIndex, 1, data);
  //     } else {
  //       newC = await createContacts(data);
  //       data.id = newC.id;
  //       STORE.contacts.push(data);
  //     }
  //     DOMHandler.load(HomePage);
  //     STORE.edit = {};
  //   } catch (error) {
  //     console.log(error);
  //     DOMHandler.reload();
  //   }
  // });
}

const ContactDetails = {
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

export default ContactDetails;
