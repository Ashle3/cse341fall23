const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

//post = create new
router.post('/', contactsController.addContact);

//put = update
router.put('/:id', contactsController.updateContact);

//delete
router.delete('/:id', contactsController.deleteContact);

module.exports = router