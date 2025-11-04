import { readContacts } from "../utils/readContacts.js";
import { writeContacts } from "../utils/writeContacts.js";
import { createFakeContact } from "../utils/createFakeContact.js";

export const addOneContact = async () => {
  const contacts = await readContacts();
  const newContact = createFakeContact();
  const updatedContacts = [...contacts, newContact];
  await writeContacts(updatedContacts);
  console.log(`Yeni kişi eklendi: ${newContact.name}`);
  console.log(`Toplam kişi sayısı: ${updatedContacts.length}`);
};

addOneContact();