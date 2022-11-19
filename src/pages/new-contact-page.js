function render() {
  return `
      <h1>New Concact</h1>
      <a class = "js-add-contact" href = "#">Cancel</a>
      <a class = "js-add-contact" href = "#">Save</a>`
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

export default NewContact;