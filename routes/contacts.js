const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

//post = create new
// router.post('/', contactsController.functionName);

// //put = update
// router.put('/:id', contactsController.functionName);

// //delete
// router.delete('/:id', contactsController.functionName);

module.exports = router