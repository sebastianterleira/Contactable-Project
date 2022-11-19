import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";

const contacts = await STORE.fetchContacts();

function contactType(param) {
  return contacts.filter((contact) => contact.favorite === param);
}

console.log(STORE.contactx);
// console.log(contacts);
// console.log(contacts.filter((contact) => contact.favorite === true).length);
// console.log(contactType(true));

const renderContact = (contact) => {
  return `<li>
            <div>
              ${contact.name}
            </div>
            <a data-id=${contact.id} style="background-color:${
    contact.favorite === true ? "green" : "red"
  }">Favorite</a>
          </li> `;
};

function render() {
  return `<h1>Contactable</h1>
    ${
      contactType(true).length > 0
        ? `<b>FAVORITES</b>
        <ul class="js-contact-lists">
          ${contactType(true).map(renderContact).join("")}</ul >`
        : ""
    }
    <br>
    <b>CONTACTS</b>
    <ul class="js-contact-list">${contacts.map(renderContact).join("")}</ul >`;
}

function listenFavorite() {
  const ul = document.querySelector(".js-contact-lists");

  ul &&
    ul.addEventListener("click", async (event) => {
      event.preventDefault();
      const favoriteLink = event.target.closest("[data-id]");
      if (!favoriteLink) return;

      const id = favoriteLink.dataset.id;
      console.log(id);
      STORE.favoriteContact(id);
      DOMHandler.reload();
      // console.log(STORE);
    });
}

function listenNoFavorite() {
  const ul = document.querySelector(".js-contact-list");

  ul.addEventListener("click", async (event) => {
    event.preventDefault();
    const favoriteLink = event.target.closest("[data-id]");
    if (!favoriteLink) return;

    const id = favoriteLink.dataset.id;
    console.log(id);
    STORE.favoriteContact(id);
    DOMHandler.reload();
    // console.log(STORE);
  });
}

const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenNoFavorite();
    listenFavorite();
  },
};

export default HomePage;

// const HomePage = {
//   toString() {
//       return `<h1>Home Page</h1>`
//   },
//   addListeners() {},
// };

// export default HomePage;
