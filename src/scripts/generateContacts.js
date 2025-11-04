import { readContacts } from "../utils/readContacts.js";
import { writeContacts } from "../utils/writeContacts.js";
import { createFakeContact } from "../utils/createFakeContact.js";

export const generateContacts = async (count = 5) => {
  const contacts = await readContacts();
  const newContacts = Array.from({ length: count }, () => createFakeContact());
  const updatedContacts = [...contacts, ...newContacts];
  await writeContacts(updatedContacts);
  console.log(`${count} yeni kişi eklendi. Toplam kişi sayısı: ${updatedContacts.length}`);
};

generateContacts();