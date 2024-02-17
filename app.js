const { program } = require('commander');
const contacts = require('./db')

console.log('Hello node')

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "getAll":
            const allContacts = await contacts.getAll()
            console.log(allContacts)
            return allContacts;
        case "getById":
            const contactById = await contacts.getById(id)
            console.log(contactById)
            return contactById;
        case "updateById":
            const updateContactById = await contacts.updateById(id, {name, email, phone})
            console.log(updateContactById)
            return updateContactById;
        case "add":
            const newContact = await contacts.addContact( {name, email, phone})
            console.log(newContact, 'case "add"')
            return newContact;
        case "remove":
            const removeContactById = await contacts.removeContact(id)
            console.log(removeContactById, 'removeContactById')
            return removeContactById;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);
// invokeAction({action: 'getAll'});
// invokeAction({action: 'getById', id: 'qdggE76Jtbfd9eWJHrssH'});
// invokeAction({action: 'add', name: 'Jon C. McCrae', email: 'jon@gmail.com', phone: "(555) 840-6677"});
// invokeAction({action: 'updateById', id: 'qdggE76Jtbfd9eWJHrssH', name: 'Marta Simons', email: 'simons@gmail.com', phone: "(555) 800-0011"});
// invokeAction({action: 'remove', id: 'qdggE76Jtbfd9eWJHrssH'});

// node app -a getAll
// node app -a getById -i 05olLMgyVQdWRwgKfg5J6
// node app -a add -n "Jon C. McCrae" -e "jon@gmail.com" -p "(555) 840-6677"