import DOMHandler from "../dom-handler.js";
import NewContact from "./new-contact-page.js";
import STORE from "../store.js";
import LoginPage from "./login-page.js";
import { logout } from "../services/sessions-service.js";
import { updateFavoriteContact } from "../services/contacts-service.js";

function contactType(param) {
  return STORE.contacts.filter((contact) => contact.favorite === param);
}

function renderContact(contact) {
  return `
      <li class = "js-contact" >
        <a data-id=${contact.id} >${contact.name}</a>
        <i data-favorite=${contact.id} class="ri-star-${
    contact.favorite === true ? "fill" : "line"
  }"></i>
      </li>
      `;
}

function render() {
  console.log(STORE.contacts);
  return `
        <h1>Contactable</h1>
        <a class="text-center block mb-8 js-logout">Logout</a>
        ${
          contactType(true).length > 0
            ? `<b>FAVORITES</b>
            <ul class="js-contact-lists">
              ${contactType(true).map(renderContact).join("")}</ul >`
            : ""
        }
        <br>
        <b>CONTACTS (${STORE.contacts.length})</b>
        <ul class="js-contact-list">
            ${STORE.contacts.map(renderContact).join("")}
        </ul>
        </div>
        <div class="button__container">
          <a class = "button__create js-add-contact" href = "#">+</a>
        </div>`;
}

function listenAddContact() {
  const a = document.querySelector(".js-add-contact");
  a.addEventListener("click", async (event) => {
    DOMHandler.load(NewContact);
  });
}

function listenContacts() {
  const ul = document.querySelector(".js-contact-list");
  ul &&
    ul.addEventListener("click", async (event) => {
      event.preventDefault();
      const editLink = event.target.closest("[data-id]");
      if (!editLink) return;
      const id = Number(editLink.dataset.id);
      console.log(id);

      const contact = STORE.contacts.find((item) => item.id === id);
      console.log(contact);

      STORE.edit = contact;
      DOMHandler.load(NewContact);
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
      console.log(id);
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

function listenLogout() {
  const a = document.querySelector(".js-logout");

  a.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      await logout();
      DOMHandler.load(LoginPage);
    } catch (error) {
      console.log(error);
    }
  });
}

const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogout();
    listenAddContact();
    listenContacts();
    listenNoFavorite();
    listenFavorite();
  },
};

export default HomePage;
