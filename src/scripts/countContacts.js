import { readContacts } from "../utils/readContacts.js";

export const countContacts = async () => {
  const contacts = await readContacts();
  const count = contacts.length;
  console.log(`Toplam kişi sayısı: ${count}`);
  return count;
};

countContacts();