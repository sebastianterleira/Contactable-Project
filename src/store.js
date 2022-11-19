import { getContacts } from "./services/contacts-service.js";

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
  return await getContacts();
  // return initialContactables;
}

function favoriteContact(id) {
  console.log(initialContactables);

  const index = initialContactables.findIndex((contact) => contact.id == id);
  console.log(index);
  if (initialContactables[index].favorite === false) {
    initialContactables[index].favorite = true;
  } else {
    initialContactables[index].favorite = false;
  }

  console.log(initialContactables);

  // localStorage.setItem("keepable", JSON.stringify(this.keepable));
}

const STORE = {
  contactx: null,
  fetchContacts,
  favoriteContact,
};

export default STORE;
