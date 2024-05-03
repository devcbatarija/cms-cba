const express = require("express");
const { addEvento, getAllEvento, updateEvento, getEventById, getActiveEvents, deleteEventoById, reportEventQrHandler } = require("../handlers/eventoHandler");
const { validateEvent } = require("../middlewares/eventoMiddleware");
const { isAdmin } = require("../services/jwtservice");
const { catchedAsync } = require("../utils");
const router = express();

router.get("/", getAllEvento);
router.get("/getActiveEvents", getActiveEvents);
router.post("/create", isAdmin, validateEvent, addEvento);
router.put("/update/:id", isAdmin, validateEvent, updateEvento);
router.get("/getById/:id", getEventById);
router.delete('/deleteEventoById/:id', isAdmin, deleteEventoById)
router.get("/event/qr/reporter", catchedAsync(reportEventQrHandler));
module.exports = router;