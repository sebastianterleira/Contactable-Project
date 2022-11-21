import STORE from "../../store.js";

function render() {
  const { title } = STORE.header;
  return `
    <div class="head">
      <h1>${title}</h1>
      <a class="text-center block mb-8 js-logout">Logout</a>
    </div>
    `;
}

const Header = {
  toString() {
    return render();
  },
};

export default Header;
