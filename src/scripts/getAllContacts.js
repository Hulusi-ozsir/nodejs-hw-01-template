import { readContacts } from "../utils/readContacts.js";

export const getAllContacts = async () => {
  const contacts = await readContacts();

  if (contacts.length === 0) {
    console.log("Kayıtlı kişi bulunamadı.");
    return [];
  }

  console.log("Tüm kişiler:");
  console.table(contacts);
  return contacts;
};

getAllContacts();