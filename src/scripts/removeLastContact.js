import { readContacts } from "../utils/readContacts.js";
import { writeContacts } from "../utils/writeContacts.js";

export const removeLastContact = async () => {
  const contacts = await readContacts();

  if (contacts.length === 0) {
    console.log("Silinecek kişi yok, veritabanı zaten boş.");
    return;
  }

  const removedContact = contacts.pop();
  await writeContacts(contacts);

  console.log(`Son kişi silindi: ${removedContact.name}`);
  console.log(`Kalan kişi sayısı: ${contacts.length}`);
};

removeLastContact();