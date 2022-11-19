import DOMHandler from "../dom-handler.js";
import NewContact from "./new-contact-page.js";
import STORE from "../store.js"
import { getContacts } from "../services/contacts-service.js";

function renderContact(contact) {
    return `
      <li class = "js-contact" >
        <a data-id=${contact.id}>${contact.name}</a>
      </li>
      `
}
  
function render() {
    
    return `
        <h1>Home Page</h1>
        <ul class="js-contact-list">
            ${STORE.contacts.map(renderContact).join("")}
        </u>
        <a class = "js-add-contact" href = "#">niu contact</a>`
}

function listenAddContact() {
    const a = document.querySelector(".js-add-contact");
    a.addEventListener("click", async (event) => {
        DOMHandler.load(NewContact);
    });
}

function listenContacts(){
    document.querySelectorAll(".js-contact").forEach(item=>{
        item.addEventListener("click", async(event) => {
            const id = Number(event.target.dataset.id);
            const contact = STORE.contacts.find(item => item.id === id);
            STORE.edit = contact;
            DOMHandler.load(NewContact);
        })
    });
}

const HomePage = {
    toString() {
        return render();
    },
    addListeners() {
        listenAddContact();
        listenContacts();
    },
};

export default HomePage;