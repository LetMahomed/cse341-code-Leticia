const express = require('express');
const router = express.Router();

const eventsController = require('../controllers/events');

const isAuthenticated  = require('../middleware/authenticate');  

router.get('/', eventsController.getAll);
router.get('/:id', eventsController.getSingle);
router.post('/', isAuthenticated, eventsController.createEvent);
router.put('/:id', isAuthenticated, eventsController.updateEvent);
router.delete('/:id', isAuthenticated, eventsController.deleteEvent);

module.exports = router;