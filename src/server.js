import express from "express";
import cors from "cors";
import { readContacts } from "./utils/readContacts.js";
import { writeContacts } from "./utils/writeContacts.js";
import { createFakeContact } from "./utils/createFakeContact.js";

const app = express();
app.use(cors());
app.use(express.json());

// Tüm kişileri getir
app.get("/contacts", async (req, res) => {
  const contacts = await readContacts();
  res.json(contacts);
});

// Belirli kişiyi getir
app.get("/contacts/:id", async (req, res) => {
  const contacts = await readContacts();
  const contact = contacts.find(c => c.id === req.params.id);

  if (!contact) {
    return res.status(404).json({ message: "Kişi bulunamadı." });
  }

  res.json(contact);
});

// Yeni kişi ekle (gövdeden ya da faker ile otomatik)
app.post("/contacts", async (req, res) => {
  const contacts = await readContacts();
  const newContact = req.body.name
    ? { id: crypto.randomUUID(), ...req.body }
    : createFakeContact();

  contacts.push(newContact);
  await writeContacts(contacts);

  res.status(201).json(newContact);
});

// Belirli kişiyi sil
app.delete("/contacts/:id", async (req, res) => {
  const contacts = await readContacts();
  const filtered = contacts.filter(c => c.id !== req.params.id);

  if (filtered.length === contacts.length) {
    return res.status(404).json({ message: "Kişi bulunamadı." });
  }

  await writeContacts(filtered);
  res.json({ message: "Kişi silindi." });
});

// Tüm kişileri sil
app.delete("/contacts", async (req, res) => {
  await writeContacts([]);
  res.json({ message: "Tüm kişiler silindi." });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});