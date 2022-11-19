import { getContacts } from "./services/contacts-service.js";

async function fetchContacts() {
  this.contacts =  await getContacts();
}

const STORE = {
  user: null,
	contacts: [],
  edit:null,
  fetchContacts
}


export default STORE;