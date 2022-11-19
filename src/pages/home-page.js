import DOMHandler from "../dom-handler.js";
import NewContact from "./new-contact-page.js";

function render() {
    return `
        <h1>Home Page</h1>
        ${categories.map(renderCategory).join("")}
        <a class = "js-add-contact" href = "#">niu contact</a>`
}


function listenAddContact() {
    const a = document.querySelector(".js-add-contact");
    a.addEventListener("click", async (event) => {
        DOMHandler.load(NewContact);
    });
}

const HomePage = {
    toString() {
        return render();
    },
    addListeners() {
        listenAddContact();
    },
};

export default HomePage;