"use strict";
import  { Router } from "express";
import { createEvent, listEvents, updateEvent, deleteEvent } from "../controllers/event.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", isAdmin, createEvent);
router.get("/", listEvents);
router.put("/:eventId", isAdmin, updateEvent);  
router.delete("/:eventId", isAdmin, deleteEvent);

export default router;