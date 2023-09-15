const routes = require('express').Router();
const lesson1controller = require('../controllers/lesson1');
 
routes.get('/', lesson1controller.momRoute);
routes.get('/dad', lesson1controller.dadRoute);

module.exports = routes;