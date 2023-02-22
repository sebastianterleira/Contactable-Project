import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import Header from "./layout/header.js";
import LoginPage from "./login-page.js";
import { logout } from "../services/sessions-service.js";
import HomePage from "./home-page.js";
import { deleteContact } from "../services/contacts-service.js";

function render() {
  const { id, name, number, email, favorite, relation } = STORE.details;
  const { formError } = ContactDetails.state;

  const title = "Contact Details";
  STORE.header = { title };
  return `
    ${Header}
    <div class="contact__details">
        <img src="./assets/empty.png" alt="" class="contact__details-img" />
      <div>${name}</div>
      <div>${relation}</div>
      <br />
      <div>Number: ${number}</div>
      <div>Email: ${email}</div>

    </div>

    <div class="contactable__actions ">
      <a class="contactable__back">Back</a>
      <a class="contactable__delete" data-id=${id}>Delete</a>
      <a class="js-add-contact contactable__edit js-contacts" data-id=${id}>Edit</a>
    </div>
    `;
}

function listenBack() {
  const back = document.querySelector(".contactable__back");
  back.addEventListener("click", async () => {
    DOMHandler.load(HomePage);
  });
}

function listenDelete() {
  const contact = document.querySelector(".contactable__delete");

  contact.addEventListener("click", async (event) => {
    event.preventDefault();
    const eraseContact = event.target.closest("[data-id]");
    if (!eraseContact) return;

    const id = eraseContact.dataset.id;

    const contacts = STORE.contacts.filter((item) => item.id != id);
    STORE.contacts = contacts;

    await deleteContact(id);

    DOMHandler.load(HomePage);
  });
}

const ContactDetails = {
  toString() {
    return render();
  },
  addListeners() {
    STORE.listenLogout();
    STORE.listenContacts();
    listenBack();
    listenDelete();
  },
  state: {
    formError: false,
  },
};

export default ContactDetails;
