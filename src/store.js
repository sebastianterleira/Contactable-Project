import DOMHandler from "./dom-handler.js";
import HomePage from "./pages/home-page.js";
import LoginPage from "./pages/login-page.js";
import NewContact from "./pages/new-contact-page.js";
import {
  createContacts,
  editContact,
  getContacts,
} from "./services/contacts-service.js";
import { logout } from "./services/sessions-service.js";

const initialContactables = [
  {
    id: 1,
    name: "UNO",
    number: 987654321,
    email: "uno@mail.com",
    relation: "Friends",
    favorite: false,
    created_at: "2022-11-18T01:20:43.857Z",
    updated_at: "2022-11-18T01:20:43.857Z",
    user_id: 419,
  },
  {
    id: 2,
    name: "DOS",
    number: 987654322,
    email: "dos@mail.com",
    relation: "Friends",
    favorite: true,
    created_at: "2022-11-18T01:21:09.917Z",
    updated_at: "2022-11-18T01:21:09.917Z",
    user_id: 419,
  },
  {
    id: 3,
    name: "TRES",
    number: 987654323,
    email: "tres@mail.com",
    relation: "Friends",
    favorite: false,
    created_at: "2022-11-18T01:21:09.917Z",
    updated_at: "2022-11-18T01:21:09.917Z",
    user_id: 419,
  },
  {
    id: 4,
    name: "CUATRO",
    number: 987654313,
    email: "cuatro@mail.com",
    relation: "Friends",
    favorite: false,
    created_at: "2022-11-18T01:21:09.917Z",
    updated_at: "2022-11-18T01:21:09.917Z",
    user_id: 419,
  },
];

async function fetchContacts() {
  this.contacts = await getContacts();
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

function listenSubmit() {
  const save = document.querySelector(".js-save-form");
  const cancel = document.querySelector(".js-cancel-form");

  cancel.addEventListener("click", async (event) => {
    DOMHandler.load(HomePage);
    STORE.edit = {};
  });

  save.addEventListener("click", async (event) => {
    event.preventDefault();

    const { name, number, email, favorite, relation } =
      document.querySelector(".js-profile-form");
    const data = {
      name: name.value,
      number: number.value,
      email: email.value,
      favorite: JSON.parse(favorite.value),
      relation: relation.value,
    };

    try {
      let newC;
      if (STORE.edit.id) {
        await editContact(data, STORE.edit.id);
        data.id = STORE.edit.id;

        let editableIndex = STORE.contacts.findIndex(
          (item) => item.id === STORE.edit.id
        );

        STORE.contacts.splice(editableIndex, 1, data);
      } else {
        newC = await createContacts(data);
        data.id = newC.id;
        STORE.contacts.push(data);
      }

      DOMHandler.load(HomePage);
      STORE.edit = {};
    } catch (error) {
      const errorName = JSON.parse(error.message).errors?.toString();
      if (errorName === "Access denied") DOMHandler.load(LoginPage);
      DOMHandler.reload();
    }
  });
}

function listenAddContact() {
  const a = document.querySelector(".js-add-contact");
  a.addEventListener("click", async (event) => {
    DOMHandler.load(NewContact);
  });
}

function listenContacts() {
  const ul = document.querySelector(".js-contacts ");
  ul &&
    ul.addEventListener("click", async (event) => {
      event.preventDefault();
      const editLink = event.target.closest("[data-id]");
      if (!editLink) return;
      const id = Number(editLink.dataset.id);

      const contact = STORE.contacts.find((item) => item.id === id);
      // console.log(contact);
      STORE.edit = contact;
      DOMHandler.load(NewContact);
    });
}

const STORE = {
  user: null,
  contacts: [],
  edit: {},
  details: {},
  header: {},
  fetchContacts,
  listenLogout,
  listenSubmit,
  listenAddContact,
  listenContacts,
};

export default STORE;
