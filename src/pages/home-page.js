function render() {
    return `
        <h1>Home Page</h1>
        <a class = "js-add-contact" href = "#">niu contact</a>`
}

function listenAddContact() {
    const a = document.querySelector(".js-add-contact");
    a.addEventListener("click", async (event) => {
        
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