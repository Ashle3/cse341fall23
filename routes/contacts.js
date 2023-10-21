const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

//post = create new
router.post('/', validation.saveContact, contactsController.addContact);

//put = update
router.put('/:id', validation.saveContact, contactsController.updateContact);

//delete
router.delete('/:id', contactsController.deleteContact);

module.exports = router;