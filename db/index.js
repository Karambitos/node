const fs = require('fs/promises')
const path = require('path')
const uuid = require("uuid");

const contactsPath = path.join(__dirname, '/contacts.json')

async function getAll() {
    const contacts = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(contacts)
}

async function getById(contactId) {
    const contacts = await getAll()
    const contact = contacts.filter((item) => item.id === String(contactId))
    return contact.length > 0 ? contact : null
}

async function addContact(data) {
    const contacts = await getAll()
    const newContact = {
        id: uuid.v4(),
        ...data
    }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
}

async function updateById(contactId, data) {
    const contacts = await getAll()
    const index = contacts.findIndex((item) => item.id === String(contactId))
    if (index === -1) return null
    contacts[index] = {contactId, ...data}
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return contacts[index]
}

async function removeContact(contactId) {
    const contacts = await getAll()
    const index = contacts.findIndex((item) => item.id === String(contactId))
    if (index === -1) return null
    const [result] = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
}


module.exports = {
    getAll,
    getById,
    addContact,
    updateById,
    removeContact
}