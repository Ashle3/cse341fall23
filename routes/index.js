const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
//first part creates '/contacts' part of the GET request
router.use('/contacts', require('./contacts'))

//router now knows that /contacts is attached to the routes/contacts.js file. Go there next
module.exports = router;