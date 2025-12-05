const express = require("express");
const router = express.Router();
const controller = require("../controllers/eventController");

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management
 */
router.get("/", controller.getAllEvents);
router.get("/:id", controller.getEventById);
router.post("/", controller.createEvent);
router.put("/:id", controller.updateEvent);
router.delete("/:id", controller.deleteEvent);

module.exports = router;
