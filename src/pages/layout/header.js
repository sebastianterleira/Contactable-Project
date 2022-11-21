import STORE from "../../store.js";
import DOMHandler from "../../dom-handler.js";
// import HomePage from "./home-page.js";
// import { input } from "../components/input.js";
// import { select } from "../components/select.js";
// import { createContacts, editContact } from "../services/contacts-service.js";
import LoginPage from "../login-page.js";
import { logout } from "../../services/sessions-service.js";

function render() {
  const { title } = STORE.header;
  const { formError } = Header.state;
  console.log(STORE.header);
  console.log(title);
  return `
    <div class="head">
      <h1>${title}</h1>
      <a class="text-center block mb-8 js-logout">Logout</a>
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

function listenLogout() {
  const a = document.querySelector(".js-logout");

  a.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log("aa2a");
    try {
      await logout();
      DOMHandler.load(LoginPage);
    } catch (error) {
      console.log(error);
    }
  });
}

const Header = {
  toString() {
    return render();
  },
  addListeners() {
    listenSubmit();
    listenLogout();
  },
  state: {
    formError: false,
  },
};

export default Header;
