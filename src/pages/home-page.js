import DOMHandler from "../dom-handler.js";
import NewContact from "./new-contact-page.js";
import STORE from "../store.js";
import LoginPage from "./login-page.js";
import { updateFavoriteContact } from "../services/contacts-service.js";
import ContactDetails from "./contact-details-page.js";
import Header from "./layout/header.js";
import { logout } from "../services/sessions-service.js";

let contactType = (param) =>
  STORE.contacts.filter((contact) => contact.favorite === param);

function renderContact(contact) {
  return `
      <li class = "js-contact" >
        <div class="contactable__info">
          <span data-details=${
            contact.id
          } ><img src="./assets/empty.png" alt="" /></span>
          <a data-id=${contact.id}>${contact.name}</a>
        </div>
        <i data-favorite=${contact.id} class="ri-star-${
    contact.favorite === true ? "fill" : "line"
  }"></i>
      </li>
      `;
}

function render() {
  const title = "Contactable";
  STORE.header = { title };

  return `
    ${Header}
    <div class="js-contacts js-contact-details">
    ${
      contactType(true).length > 0
        ? `<b>FAVORITES</b>
        <ul class="js-contact-lists">
          ${contactType(true).map(renderContact).join("")}</ul >`
        : ""
    }
    <b>CONTACTS (${STORE.contacts.length})</b>
    <ul class="js-contact-list">
        ${STORE.contacts.map(renderContact).join("")}
    </ul>
    </div>
    
    <div class="button__container">
      <a class = "button__create js-add-contact" href = "#">+</a>
    </div>`;
}

function listenContactDetails() {
  const ul = document.querySelector(".js-contact-details ");
  ul &&
    ul.addEventListener("click", async (event) => {
      event.preventDefault();
      const editLink = event.target.closest("[data-details]");
      if (!editLink) return;
      const id = Number(editLink.dataset.details);
      const contact = STORE.contacts.find((item) => item.id === id);
      STORE.details = contact;

      DOMHandler.load(ContactDetails);
    });
}

function listenFavorite() {
  const ul = document.querySelector(".js-contact-lists");

  ul &&
    ul.addEventListener("click", async (event) => {
      event.preventDefault();
      const favoriteLink = event.target.closest("[data-favorite]");
      if (!favoriteLink) return;

      const id = favoriteLink.dataset.favorite;
      await updateFavoriteContact(id, toggleFavorite(id));
      STORE.contacts.find((a) => a.id == id).favorite = toggleFavorite(id);

      DOMHandler.reload();
    });
}

function listenNoFavorite() {
  const ul = document.querySelector(".js-contact-list");

  ul.addEventListener("click", async (event) => {
    event.preventDefault();
    const favoriteLink = event.target.closest("[data-favorite]");
    if (!favoriteLink) return;

    const id = favoriteLink.dataset.favorite;
    await updateFavoriteContact(id, toggleFavorite(id));
    STORE.contacts.find((a) => a.id == id).favorite = toggleFavorite(id);

    DOMHandler.reload();

    try {
    } catch (error) {
      console.log("no favorite error");
    }
  });
}

function toggleFavorite(id) {
  const index = STORE.contacts.findIndex((contact) => contact.id == id);
  let isFavorite = false;
  if (STORE.contacts[index].favorite === false) {
    isFavorite = true;
  }
  return isFavorite;
}

const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    STORE.listenAddContact();
    STORE.listenContacts();
    listenNoFavorite();
    listenFavorite();
    listenContactDetails();
    STORE.listenLogout();
  },
};

export default HomePage;
