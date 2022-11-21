import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import Header from "./layout/header.js";
import LoginPage from "./login-page.js";
import { logout } from "../services/sessions-service.js";
import HomePage from "./home-page.js";

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

    <div class="contactable__actions js-contacts">
      <a class="contactable__back">Back</a>
      <a class="js-add-contact contactable__edit" data-id=${id}>Edit</a>
    </div>
    `;
}

function listenBack() {
  const back = document.querySelector(".contactable__back");
  back.addEventListener("click", async () => {
    DOMHandler.load(HomePage);
  });
}

const ContactDetails = {
  toString() {
    return render();
  },
  addListeners() {
    STORE.listenLogout();
    listenBack();
    STORE.listenContacts();
  },
  state: {
    formError: false,
  },
};

export default ContactDetails;
